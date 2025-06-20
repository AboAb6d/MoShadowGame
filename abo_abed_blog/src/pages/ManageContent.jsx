import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const initialArticlesData = [
    { id: uuidv4(), title: 'مقدمة في الذكاء الاصطناعي', content: 'محتوى طويل عن الذكاء الاصطناعي...', category: 'تقنية', tags: 'AI, تعلم الآلة', publishDate: '2024-01-15', seoTitle: '', seoDescription: '', featuredImage: 'https://via.placeholder.com/150/007bff/FFFFFF?Text=AI' },
    { id: uuidv4(), title: 'أفضل ممارسات تطوير الويب الحديثة', content: 'محتوى مفصل حول أفضل الممارسات...', category: 'تطوير ويب', tags: 'React, CSS, JavaScript', publishDate: '2024-02-10', seoTitle: '', seoDescription: '', featuredImage: 'https://via.placeholder.com/150/28a745/FFFFFF?Text=WebDev' },
    { id: uuidv4(), title: 'دليل شامل للأمن السيبراني للمبتدئين', content: 'كل ما تحتاج لمعرفته حول الأمن السيبراني...', category: 'أمن سيبراني', tags: 'حماية, فيروسات', publishDate: '2024-03-05', seoTitle: '', seoDescription: '', featuredImage: 'https://via.placeholder.com/150/dc3545/FFFFFF?Text=CyberSec' },
];

const localStorageKey = 'blogArticles_v2'; // Changed key to avoid conflicts if old data exists
const formLocalStorageKey = 'manageContentForm_v2';

function ManageContent() {
    const [articles, setArticles] = useState(() => {
        const storedArticles = localStorage.getItem(localStorageKey);
        return storedArticles ? JSON.parse(storedArticles) : initialArticlesData;
    });

    const [isEditing, setIsEditing] = useState(false);
    const [currentArticle, setCurrentArticle] = useState(null);
    const [saveStatus, setSaveStatus] = useState(''); // '', 'saving', 'saved'

    // Form state - load from localStorage if available
    const initialFormState = { title: '', content: '', category: '', tags: '', seoTitle: '', seoDescription: '', featuredImage: '' };
    const [formData, setFormData] = useState(() => {
        const storedFormData = localStorage.getItem(formLocalStorageKey);
        return storedFormData ? JSON.parse(storedFormData) : initialFormState;
    });

    // Debounce timer for saving form data
    let debounceTimer;

    // Save articles to localStorage
    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(articles));
    }, [articles]);

    // Save form data to localStorage with debounce
    const debouncedSaveFormData = useCallback(() => {
        clearTimeout(debounceTimer);
        setSaveStatus('يتم الحفظ...');
        debounceTimer = setTimeout(() => {
            localStorage.setItem(formLocalStorageKey, JSON.stringify(formData));
            setSaveStatus('تم حفظ التغييرات مؤقتًا.');
            setTimeout(() => setSaveStatus(''), 2000); // Clear status after 2s
        }, 1000); // Save after 1 second of inactivity
    }, [formData]);

    useEffect(() => {
        if (Object.values(formData).some(val => val !== '')) { // Only save if form has data
            debouncedSaveFormData();
        }
        return () => clearTimeout(debounceTimer); // Cleanup timer
    }, [formData, debouncedSaveFormData]);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const resetForm = () => {
        setFormData(initialFormState);
        setIsEditing(false);
        setCurrentArticle(null);
        localStorage.removeItem(formLocalStorageKey); // Clear form backup
        setSaveStatus('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!formData.title || !formData.content || !formData.category) {
            alert('يرجى ملء جميع الحقول المطلوبة: العنوان، المحتوى، والفئة.');
            return;
        }
        clearTimeout(debounceTimer); // Clear any pending save

        if (isEditing && currentArticle) {
            setArticles(articles.map(article =>
                article.id === currentArticle.id ? { ...article, ...formData, publishDate: article.publishDate } : article
            ));
            setSaveStatus('تم تحديث المقال بنجاح!');
        } else {
            const newArticle = {
                id: uuidv4(),
                ...formData,
                publishDate: new Date().toISOString().split('T')[0]
            };
            setArticles([newArticle, ...articles]);
            setSaveStatus('تم إضافة المقال بنجاح!');
        }
        resetForm();
        setTimeout(() => setSaveStatus(''), 3000);
    };

    const handleEdit = (articleToEdit) => {
        setIsEditing(true);
        setCurrentArticle(articleToEdit);
        setFormData({
            title: articleToEdit.title,
            content: articleToEdit.content,
            category: articleToEdit.category,
            tags: articleToEdit.tags,
            seoTitle: articleToEdit.seoTitle || '',
            seoDescription: articleToEdit.seoDescription || '',
            featuredImage: articleToEdit.featuredImage || ''
        });
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to form
    };

    const handleDelete = (articleId) => {
        if (window.confirm('هل أنت متأكد أنك تريد حذف هذا المقال؟')) {
            setArticles(articles.filter(article => article.id !== articleId));
            if (isEditing && currentArticle && currentArticle.id === articleId) {
                resetForm();
            }
            setSaveStatus('تم حذف المقال.');
            setTimeout(() => setSaveStatus(''), 3000);
        }
    };

    // Mock Media Manager states
    const [articleMedia, setArticleMedia] = useState([]);
    const [altText, setAltText] = useState({});

    const handleMediaUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const newMedium = { id: uuidv4(), name: file.name, url: URL.createObjectURL(file), type: file.type };
            setArticleMedia([...articleMedia, newMedium]);
            alert(`تم "رفع" الملف: ${file.name} (وهمي)`);
        }
    };
    const handleDeleteMedia = (mediaId) => {
        setArticleMedia(articleMedia.filter(m => m.id !== mediaId));
    };
    const handleAltTextChange = (mediaId, text) => {
        setAltText({...altText, [mediaId]: text});
    };

    // Mock Comments Manager states
    const [articleComments, setArticleComments] = useState([
        {id:1, user: "زائر1", text: "مقال رائع!", date: "2024-03-15", status: "approved", suggestedReply: "شكراً لك!"},
        {id:2, user: "قارئ آخر", text: "لم أفهم النقطة الثانية.", date: "2024-03-16", status: "pending", suggestedReply: "أهلاً بك، النقطة الثانية توضح أن..."}
    ]);


    return (
        <div className="manage-content-page admin-page">
            <h1>إدارة محتوى المقالات</h1>

            <div className="admin-section content-form-section">
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <h2>{isEditing ? 'تعديل المقال' : 'إضافة مقال جديد'}</h2>
                    {saveStatus && <small className="save-status">{saveStatus}</small>}
                </div>
                <form onSubmit={handleSubmit} className="content-form">
                    <div className="form-group">
                        <label htmlFor="title">عنوان المقال:</label>
                        <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">محتوى المقال:</label>
                        <textarea id="content" name="content" value={formData.content} onChange={handleInputChange} rows="10" required></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">الفئة:</label>
                        <input type="text" id="category" name="category" value={formData.category} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="tags">الوسوم (مفصولة بفاصلة):</label>
                        <input type="text" id="tags" name="tags" value={formData.tags} onChange={handleInputChange} />
                    </div>
                     <div className="form-group">
                        <label htmlFor="featuredImage">رابط الصورة البارزة (URL):</label>
                        <input type="url" id="featuredImage" name="featuredImage" value={formData.featuredImage} onChange={handleInputChange} placeholder="https://example.com/image.jpg" />
                    </div>
                    <hr/>
                    <h3>إعدادات SEO للمقال:</h3>
                     <div className="form-group">
                        <label htmlFor="seoTitle">عنوان SEO (Meta Title):</label>
                        <input type="text" id="seoTitle" name="seoTitle" value={formData.seoTitle} onChange={handleInputChange} placeholder="عنوان يظهر في جوجل (اختياري)" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="seoDescription">وصف Meta:</label>
                        <textarea id="seoDescription" name="seoDescription" value={formData.seoDescription} onChange={handleInputChange} rows="3" placeholder="وصف قصير للمقال لجوجل (اختياري)"></textarea>
                    </div>

                    <div className="form-actions">
                        <button type="submit" className="button-primary">
                            {isEditing ? 'حفظ التعديلات' : 'إضافة المقال'}
                        </button>
                        {isEditing && (
                            <button type="button" className="button-secondary" onClick={resetForm}>
                                إلغاء التعديل
                            </button>
                        )}
                    </div>
                </form>
            </div>

            {/* Mock Media Manager Section */}
            <div className="admin-section media-manager-section">
                <h2>إدارة وسائط المقال الحالي (وهمي)</h2>
                <div className="form-group">
                    <label htmlFor="media-upload">رفع صورة/ملف:</label>
                    <input type="file" id="media-upload" onChange={handleMediaUpload} accept="image/*,video/*" />
                </div>
                {articleMedia.length > 0 && (
                    <div className="media-list">
                        {articleMedia.map(medium => (
                            <div key={medium.id} className="media-item">
                                {medium.type.startsWith('image/') ?
                                    <img src={medium.url} alt={medium.name} style={{width: '100px', height:'auto', marginRight: '10px'}}/> :
                                    <span>{medium.name} ({medium.type})</span>
                                }
                                <input
                                    type="text"
                                    value={altText[medium.id] || ''}
                                    onChange={(e) => handleAltTextChange(medium.id, e.target.value)}
                                    placeholder="وصف الصورة (Alt text)"
                                    style={{flexGrow: 1, margin: '0 10px'}}
                                />
                                <button className="button-delete" onClick={() => handleDeleteMedia(medium.id)}>حذف</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Mock Comments Manager Section */}
            <div className="admin-section comments-manager-section">
                <h2>إدارة تعليقات المقال الحالي (وهمي)</h2>
                {articleComments.length > 0 ? (
                    <ul className="comments-list">
                        {articleComments.map(comment => (
                            <li key={comment.id} className={`comment-item status-${comment.status}`}>
                                <p><strong>{comment.user}</strong> ({comment.date}): {comment.text}</p>
                                <small>الحالة: {comment.status}</small>
                                <div className="comment-actions">
                                    <button className="button-primary small">موافقة</button>
                                    <button className="button-delete small">حذف</button>
                                    <button className="button-secondary small">رد</button>
                                </div>
                                {comment.suggestedReply && <textarea rows="2" defaultValue={comment.suggestedReply} placeholder="اقتراح رد ذكي..." style={{marginTop: '5px', width: '100%'}}></textarea>}
                            </li>
                        ))}
                    </ul>
                ) : <p>لا توجد تعليقات على هذا المقال بعد.</p>}
            </div>


            <div className="admin-section articles-table-section">
                <h2>قائمة المقالات</h2>
                {articles.length === 0 ? (
                    <p>لا توجد مقالات لعرضها. قم بإضافة مقال جديد!</p>
                ) : (
                    <table className="data-table articles-table">
                        <thead>
                            <tr>
                                <th>العنوان</th>
                                <th>الفئة</th>
                                <th>الوسوم</th>
                                <th>تاريخ النشر</th>
                                <th>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map(article => (
                                <tr key={article.id}>
                                    <td>{article.title}</td>
                                    <td>{article.category}</td>
                                    <td>{article.tags}</td>
                                    <td>{article.publishDate}</td>
                                    <td className="actions-cell">
                                        <button className="button-edit" onClick={() => handleEdit(article)}>تعديل</button>
                                        <button className="button-delete" onClick={() => handleDelete(article.id)}>حذف</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default ManageContent;
