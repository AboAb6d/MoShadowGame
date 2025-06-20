import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const initialAffiliateLinks = [
    { id: uuidv4(), productName: 'ホスティングサービスX', link: 'https://example.com/hostingx?affid=123', commissionRate: '10%', notes: 'عرض خاص للشهر الحالي' },
    { id: uuidv4(), productName: 'قالب ووردبريس Y', link: 'https://example.com/themey?ref=abc', commissionRate: '25%', notes: 'الأكثر مبيعًا' },
];
const localStorageAffiliateKey = 'blogAffiliateLinks';

const initialAdZones = {
    headerAd: { enabled: true, code: '<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_CLIENT_ID" crossorigin="anonymous"></script>\n<!-- Header Ad Unit -->\n<ins class="adsbygoogle"\n     style="display:block"\n     data-ad-client="ca-pub-YOUR_CLIENT_ID"\n     data-ad-slot="YOUR_HEADER_AD_SLOT_ID"\n     data-ad-format="auto"\n     data-full-width-responsive="true"></ins>\n<script>\n     (adsbygoogle = window.adsbygoogle || []).push({});\n</script>' },
    sidebarAd: { enabled: false, code: '' },
    inArticleAd: { enabled: true, code: '<!-- In-Article Ad Code Placeholder -->' },
    footerAd: { enabled: false, code: '' },
};
const localStorageAdsKey = 'blogAdZones';


function Monetization() {
    const [affiliateLinks, setAffiliateLinks] = useState(() => {
        const storedLinks = localStorage.getItem(localStorageAffiliateKey);
        return storedLinks ? JSON.parse(storedLinks) : initialAffiliateLinks;
    });
    const [adZones, setAdZones] = useState(() => {
        const storedAds = localStorage.getItem(localStorageAdsKey);
        return storedAds ? JSON.parse(storedAds) : initialAdZones;
    });

    // State for adding/editing affiliate links (simplified for this example)
    const [showAffiliateForm, setShowAffiliateForm] = useState(false);
    const [currentAffiliate, setCurrentAffiliate] = useState({ productName: '', link: '', commissionRate: '', notes: '' });

    useEffect(() => {
        localStorage.setItem(localStorageAffiliateKey, JSON.stringify(affiliateLinks));
    }, [affiliateLinks]);

    useEffect(() => {
        localStorage.setItem(localStorageAdsKey, JSON.stringify(adZones));
    }, [adZones]);

    const handleAdZoneChange = (zone) => {
        setAdZones(prev => ({
            ...prev,
            [zone]: { ...prev[zone], enabled: !prev[zone].enabled }
        }));
    };

    const handleAdCodeChange = (zone, value) => {
         setAdZones(prev => ({
            ...prev,
            [zone]: { ...prev[zone], code: value }
        }));
    };

    const handleSaveAdCodes = () => {
        // localStorage saving is handled by useEffect
        alert("تم حفظ أكواد الإعلانات!");
    };

    const handleAffiliateFormSubmit = (e) => {
        e.preventDefault();
        // Basic validation
        if (!currentAffiliate.productName || !currentAffiliate.link) {
            alert("يرجى ملء اسم المنتج والرابط على الأقل.");
            return;
        }
        // In a real app, you'd handle edit vs add
        setAffiliateLinks([...affiliateLinks, { ...currentAffiliate, id: uuidv4() }]);
        setCurrentAffiliate({ productName: '', link: '', commissionRate: '', notes: '' });
        setShowAffiliateForm(false);
    };

    const handleDeleteAffiliate = (id) => {
        if (window.confirm("هل أنت متأكد من حذف هذا الرابط التابع؟")) {
            setAffiliateLinks(affiliateLinks.filter(link => link.id !== id));
        }
    };


    return (
        <div className="monetization-page">
            <h1>إدارة الإعلانات والروابط التابعة</h1>
            <p>تحكم في كيفية تحقيق الدخل من مدونتك.</p>

            <section className="settings-section">
                <h2>إدارة مناطق الإعلانات</h2>
                <p>قم بتفعيل أو تعطيل مناطق الإعلانات المختلفة وأضف أكواد الإعلانات الخاصة بك.</p>
                <div className="ad-zones-management">
                    {Object.keys(adZones).map(zoneKey => (
                        <div key={zoneKey} className="ad-zone-item form-group">
                            <label>
                                <input
                                    type="checkbox"
                                    checked={adZones[zoneKey].enabled}
                                    onChange={() => handleAdZoneChange(zoneKey)}
                                />
                                تفعيل منطقة الإعلان: {zoneKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                            </label>
                            {adZones[zoneKey].enabled && (
                                <textarea
                                    value={adZones[zoneKey].code}
                                    onChange={(e) => handleAdCodeChange(zoneKey, e.target.value)}
                                    rows="6"
                                    placeholder={`ضع كود الإعلان لمنطقة ${zoneKey} هنا`}
                                />
                            )}
                        </div>
                    ))}
                </div>
                 <div className="form-actions">
                    <button onClick={handleSaveAdCodes} className="button-primary">حفظ إعدادات الإعلانات</button>
                </div>
            </section>

            <section className="settings-section">
                <h2>إدارة الروابط التابعة</h2>
                <div className="form-actions">
                    <button onClick={() => setShowAffiliateForm(!showAffiliateForm)} className="button-secondary">
                        {showAffiliateForm ? 'إخفاء نموذج الإضافة' : 'إضافة رابط تابع جديد'}
                    </button>
                </div>

                {showAffiliateForm && (
                    <form onSubmit={handleAffiliateFormSubmit} className="content-form" style={{marginTop: '1rem'}}>
                        <h3>إضافة/تعديل رابط تابع</h3>
                        <div className="form-group">
                            <label htmlFor="productName">اسم المنتج/الخدمة:</label>
                            <input type="text" id="productName" value={currentAffiliate.productName} onChange={e => setCurrentAffiliate({...currentAffiliate, productName: e.target.value})} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="affiliateLink">الرابط التابع:</label>
                            <input type="url" id="affiliateLink" value={currentAffiliate.link} onChange={e => setCurrentAffiliate({...currentAffiliate, link: e.target.value})} required placeholder="https://example.com/product?ref=your_id" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="commissionRate">نسبة/قيمة العمولة:</label>
                            <input type="text" id="commissionRate" value={currentAffiliate.commissionRate} onChange={e => setCurrentAffiliate({...currentAffiliate, commissionRate: e.target.value})} placeholder="مثال: 10% أو 5$" />
                        </div>
                         <div className="form-group">
                            <label htmlFor="notes">ملاحظات:</label>
                            <textarea id="notes" value={currentAffiliate.notes} onChange={e => setCurrentAffiliate({...currentAffiliate, notes: e.target.value})} rows="2"></textarea>
                        </div>
                        <button type="submit" className="button-primary">حفظ الرابط</button>
                    </form>
                )}

                {affiliateLinks.length > 0 ? (
                    <table className="data-table affiliate-links-table" style={{marginTop: '1.5rem'}}>
                        <thead>
                            <tr>
                                <th>اسم المنتج/الخدمة</th>
                                <th>الرابط التابع</th>
                                <th>العمولة</th>
                                <th>ملاحظات</th>
                                <th>إجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {affiliateLinks.map(link => (
                                <tr key={link.id}>
                                    <td>{link.productName}</td>
                                    <td><a href={link.link} target="_blank" rel="noopener noreferrer">{link.link}</a></td>
                                    <td>{link.commissionRate}</td>
                                    <td>{link.notes}</td>
                                    <td className="actions-cell">
                                        {/* <button className="button-edit" onClick={() => {setShowAffiliateForm(true); setCurrentAffiliate(link);}}>تعديل</button> */}
                                        <button className="button-delete" onClick={() => handleDeleteAffiliate(link.id)}>حذف</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : <p style={{marginTop: '1rem'}}>لا توجد روابط تابعة مضافة حاليًا.</p>}
            </section>
        </div>
    );
}

export default Monetization;
