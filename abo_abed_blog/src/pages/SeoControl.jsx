import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function SeoControl() {
    const [googleSearchConsoleId, setGoogleSearchConsoleId] = useState('');
    const [googleAnalyticsId, setGoogleAnalyticsId] = useState('');

    // State for Snippet Preview
    const [snippetTitle, setSnippetTitle] = useState('عنوان مقالك الجذاب هنا | مدونة أبو عبد');
    const [snippetMetaDesc, setSnippetMetaDesc] = useState('وصف قصير ومقنع لمقالك يظهر في نتائج البحث ويجذب القراء للنقر...');
    const siteUrlBase = "https://www.aboabed.dev"; // Replace with actual site URL eventually

    // State for Keyword Suggestion
    const [mainKeyword, setMainKeyword] = useState('');
    const [suggestedKeywords, setSuggestedKeywords] = useState([]);

    const handleIntegrationsSave = (e) => {
        e.preventDefault();
        console.log("SEO Integrations Saved:", { googleSearchConsoleId, googleAnalyticsId });
        alert("تم حفظ إعدادات التكامل (وهمي)!");
    };

    const handleCheckSpeed = () => {
        alert("جاري فحص سرعة الموقع... (وظيفة وهمية)");
    };

    const handleAnalyzeKeywords = () => {
        alert("جاري تحليل الكلمات المفتاحية... (وظيفة وهمية)");
    };

    const handleSuggestKeywords = () => {
        if (!mainKeyword.trim()) {
            setSuggestedKeywords([]);
            return;
        }
        // Simulate keyword suggestions
        setSuggestedKeywords([
            `${mainKeyword} للمبتدئين`,
            `أفضل ${mainKeyword} في 2024`,
            `كيفية استخدام ${mainKeyword} بفعالية`,
            `${mainKeyword} متقدم`,
            `أسرار ${mainKeyword}`
        ]);
    };


    return (
        <div className="seo-control-page admin-page"> {/* Added admin-page class */}
            <h1>لوحة تحكم SEO</h1>
            <p>إدارة وتحسين ظهور مدونتك في محركات البحث.</p>

            <section className="admin-section"> {/* Changed from settings-section to admin-section */}
                <h2>SEO للمقالات</h2>
                <p>
                    يتم إدارة إعدادات SEO الخاصة بكل مقال (مثل العنوان، الوصف، الكلمات المفتاحية)
                    مباشرة من قسم <Link to="/admin/manage-content">إدارة المحتوى</Link> عند إضافة أو تعديل مقال.
                </p>
                <p>تأكد من كتابة عناوين ووصف فريد وجذاب لكل مقال.</p>
            </section>

            <section className="admin-section">
                <h2>معاينة Snippet (كيف يظهر مقالك في جوجل - مثال)</h2>
                <div className="form-group">
                    <label htmlFor="snippetTitle">عنوان SEO للمقال (Title Tag):</label>
                    <input type="text" id="snippetTitle" value={snippetTitle} onChange={(e) => setSnippetTitle(e.target.value)} placeholder="أدخل عنوان SEO للمقال هنا" />
                </div>
                <div className="form-group">
                    <label htmlFor="snippetMetaDesc">وصف Meta للمقال:</label>
                    <textarea id="snippetMetaDesc" value={snippetMetaDesc} onChange={(e) => setSnippetMetaDesc(e.target.value)} rows="3" placeholder="أدخل وصف Meta هنا (حوالي 155-160 حرف)"></textarea>
                </div>
                <div className="google-snippet-preview">
                    <h3 className="snippet-title">{snippetTitle || "عنوان مقالك الجذاب هنا | مدونة أبو عبد"}</h3>
                    <p className="snippet-url">{siteUrlBase}/مقالات/اسم-المقال-هنا</p>
                    <p className="snippet-description">{snippetMetaDesc || "وصف قصير ومقنع لمقالك يظهر في نتائج البحث ويجذب القراء للنقر..."}</p>
                </div>
            </section>

            <section className="admin-section">
                <h2>اقتراح الكلمات المفتاحية (وهمي)</h2>
                <div className="form-group">
                    <label htmlFor="mainKeyword">الكلمة المفتاحية الرئيسية للمقال:</label>
                    <input type="text" id="mainKeyword" value={mainKeyword} onChange={(e) => setMainKeyword(e.target.value)} placeholder="مثال: أفضل أدوات SEO" />
                </div>
                <div className="form-actions">
                    <button onClick={handleSuggestKeywords} className="button-secondary">اقتراح كلمات مشابهة</button>
                </div>
                {suggestedKeywords.length > 0 && (
                    <div className="suggested-keywords-list">
                        <h4>كلمات مفتاحية مقترحة:</h4>
                        <ul>
                            {suggestedKeywords.map((keyword, index) => (
                                <li key={index}>{keyword}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </section>

            <section className="admin-section">
                <h2>إعدادات SEO العامة للموقع</h2>
                 <p>
                    يتم إدارة إعدادات SEO العامة للموقع (مثل عنوان الموقع الافتراضي، الوصف العام)
                    من قسم <Link to="/admin/settings">الإعدادات</Link>.
                </p>
            </section>

            <section className="admin-section">
                <h2>تكاملات خارجية (External Integrations)</h2>
                <form onSubmit={handleIntegrationsSave}>
                    <div className="form-group">
                        <label htmlFor="googleSearchConsoleId">معرف Google Search Console:</label>
                        <input
                            type="text"
                            id="googleSearchConsoleId"
                            value={googleSearchConsoleId}
                            onChange={e => setGoogleSearchConsoleId(e.target.value)}
                            placeholder="مثال: sc-domain:example.com أو معرف HTML tag"
                        />
                        <small>أضف معرف تتبع Google Search Console للتحقق من ملكية الموقع ومراقبة أدائه في بحث Google.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="googleAnalyticsId">معرف Google Analytics (GA4):</label>
                        <input
                            type="text"
                            id="googleAnalyticsId"
                            value={googleAnalyticsId}
                            onChange={e => setGoogleAnalyticsId(e.target.value)}
                            placeholder="مثال: G-XXXXXXXXXX"
                        />
                        <small>أضف معرف تتبع Google Analytics لمراقبة زيارات الموقع وسلوك المستخدمين.</small>
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="button-primary">حفظ إعدادات التكامل</button>
                    </div>
                </form>
            </section>

            <section className="admin-section">
                <h2>أدوات تحليل SEO (وهمية)</h2>
                <div className="tools-grid seo-tools-grid">
                    <div className="tool-card-placeholder">
                        <h3>فحص سرعة الموقع</h3>
                        <p>تحقق من سرعة تحميل صفحات موقعك واحصل على توصيات لتحسينها.</p>
                        <button onClick={handleCheckSpeed} className="button-secondary">ابدأ الفحص</button>
                    </div>
                    <div className="tool-card-placeholder">
                        <h3>تحليل الكلمات المفتاحية</h3>
                        <p>اكتشف الكلمات المفتاحية التي يستخدمها جمهورك المستهدف.</p>
                        <button onClick={handleAnalyzeKeywords} className="button-secondary">ابدأ التحليل</button>
                    </div>
                     <div className="tool-card-placeholder">
                        <h3>فحص الروابط الخلفية (Backlinks)</h3>
                        <p>اطلع على المواقع التي تشير إلى مدونتك.</p>
                        <button onClick={() => alert("وظيفة وهمية")} className="button-secondary">فحص الروابط</button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default SeoControl;
