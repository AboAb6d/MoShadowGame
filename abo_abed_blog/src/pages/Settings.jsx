import React, { useState } from 'react';

function Settings() {
    // Example state for settings - in a real app, this would be fetched and updated
    const [blogName, setBlogName] = useState('مدونة أبو عبد التقنية');
    const [theme, setTheme] = useState('light');
    const [adsTop, setAdsTop] = useState(true);
    const [adsSidebar, setAdsSidebar] = useState(false);
    const [customAdCode, setCustomAdCode] = useState('');
    const [defaultSiteTitle, setDefaultSiteTitle] = useState('مدونة أبو عبد | تقنية، أدوات، والمزيد');
    const [defaultSiteDescription, setDefaultSiteDescription] = useState('مدونة شخصية تهتم بمشاركة أحدث المقالات والأدوات في عالم التقنية والبرمجة.');
    const [mainKeywords, setMainKeywords] = useState('تقنية, برمجة, أدوات ويب, أبو عبد');

    // State for advanced settings
    const [enableDefaultDarkMode, setEnableDefaultDarkMode] = useState(false);
    const [enableStealthMode, setEnableStealthMode] = useState(false);


    const handleSave = (e) => {
        e.preventDefault();
        // In a real app, you would save these settings to a backend or localStorage
        console.log('Settings saved:', {
            blogName, theme, adsTop, adsSidebar, /*customAdCode,*/ // customAdCode was removed as it's better in Monetization section
            defaultSiteTitle, defaultSiteDescription, mainKeywords,
            enableDefaultDarkMode, enableStealthMode
        });
        alert('تم حفظ الإعدادات (وهمي)!');
    };

    const handleResetSettings = () => {
        if (window.confirm("هل أنت متأكد أنك تريد إعادة تعيين جميع الإعدادات إلى الوضع الافتراضي؟ هذا الإجراء لا يمكن التراجع عنه.")) {
            // Reset state variables to their initial defaults (or fetch from a 'default config')
            setBlogName('مدونة أبو عبد التقنية');
            setTheme('light');
            setAdsTop(true);
            setAdsSidebar(false);
            setDefaultSiteTitle('مدونة أبو عبد | تقنية، أدوات، والمزيد');
            setDefaultSiteDescription('مدونة شخصية تهتم بمشاركة أحدث المقالات والأدوات في عالم التقنية والبرمجة.');
            setMainKeywords('تقنية, برمجة, أدوات ويب, أبو عبد');
            setEnableDefaultDarkMode(false);
            setEnableStealthMode(false);
            alert("تمت إعادة تعيين الإعدادات إلى الوضع الافتراضي (وهمي)!");
        }
    };


    return (
        <div className="settings-page admin-page"> {/* Added admin-page class */}
            <h1>إعدادات المدونة</h1>
            <form onSubmit={handleSave} className="settings-form">

                <section className="admin-section"> {/* Changed to admin-section for consistency */}
                    <h2>مظهر المدونة</h2>
                    <div className="form-group">
                        <label htmlFor="blogName">اسم المدونة:</label>
                        <input type="text" id="blogName" value={blogName} onChange={e => setBlogName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="theme">ثيم المدونة:</label>
                        <select id="theme" value={theme} onChange={e => setTheme(e.target.value)}>
                            <option value="light">فاتح (افتراضي)</option>
                            <option value="dark">داكن</option>
                            <option value="custom">مخصص (يتطلب إعدادات ألوان)</option>
                        </select>
                    </div>
                    {/* Add color pickers here if theme is 'custom' */}
                </section>

                <section className="admin-section"> {/* Changed to admin-section */}
                    <h2>إعدادات الإعلانات (من قسم Monetization)</h2>
                     <p>ملاحظة: يتم الآن إدارة إعدادات الإعلانات التفصيلية من قسم "إدارة الإعلانات".</p>
                    <div className="form-group">
                        <label>
                            <input type="checkbox" checked={adsTop} onChange={e => setAdsTop(e.target.checked)} />
                            تفعيل الإعلانات أعلى المقال
                        </label>
                    </div>
                    <div className="form-group">
                        <label>
                            <input type="checkbox" checked={adsSidebar} onChange={e => setAdsSidebar(e.target.checked)} />
                            تفعيل الإعلانات في الشريط الجانبي (للموقع العام)
                        </label>
                    </div>
                </section>

                <section className="admin-section"> {/* Changed to admin-section */}
                    <h2>إعدادات SEO العامة (من قسم SeoControl)</h2>
                    <p>ملاحظة: يتم الآن إدارة إعدادات SEO التفصيلية من قسم "لوحة تحكم SEO".</p>
                    <div className="form-group">
                        <label htmlFor="defaultSiteTitle">عنوان الموقع الافتراضي:</label>
                        <input type="text" id="defaultSiteTitle" value={defaultSiteTitle} onChange={e => setDefaultSiteTitle(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="defaultSiteDescription">وصف الموقع الافتراضي (Meta Description):</label>
                        <textarea id="defaultSiteDescription" rows="3" value={defaultSiteDescription} onChange={e => setDefaultSiteDescription(e.target.value)}></textarea>
                    </div>
                     <div className="form-group">
                        <label htmlFor="mainKeywords">الكلمات المفتاحية الرئيسية للموقع (مفصولة بفاصلة):</label>
                        <input type="text" id="mainKeywords" value={mainKeywords} onChange={e => setMainKeywords(e.target.value)} />
                    </div>
                </section>

                <section className="admin-section">
                    <h2>إعدادات متقدمة</h2>
                    <div className="form-group">
                        <label>
                            <input type="checkbox" checked={enableDefaultDarkMode} onChange={e => setEnableDefaultDarkMode(e.target.checked)} />
                            تفعيل الوضع الليلي الافتراضي للمستخدمين الجدد (وهمي)
                        </label>
                        <small>إذا تم تفعيله، سيرى الزوار الجدد الموقع بالوضع الليلي تلقائيًا إذا لم يكن لديهم تفضيل محفوظ.</small>
                    </div>
                    <div className="form-group">
                        <label>
                            <input type="checkbox" checked={enableStealthMode} onChange={e => setEnableStealthMode(e.target.checked)} />
                            تفعيل وضع التخفي (إخفاء التحديثات الجديدة عن الزوار غير المسجلين) (وهمي)
                        </label>
                        <small>عند تفعيله، يمكنك كمحرر رؤية جميع التغييرات والمقالات الجديدة، بينما يرى الزوار النسخة المنشورة المستقرة فقط.</small>
                    </div>
                    <div className="form-group">
                        <label>إعادة تعيين الإعدادات:</label>
                        <button type="button" className="button-delete" onClick={handleResetSettings}>
                            إعادة تعيين جميع إعدادات المدونة إلى الوضع الافتراضي
                        </button>
                        <small>تحذير: هذا الإجراء سيقوم بإعادة ضبط جميع الإعدادات في هذه الصفحة إلى قيمها الأولية.</small>
                    </div>
                </section>

                <div className="form-actions">
                    <button type="submit" className="button-primary">حفظ كل الإعدادات</button>
                </div>
            </form>
        </div>
    );
}

export default Settings;
