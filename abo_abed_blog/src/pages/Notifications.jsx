import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const initialNotifications = [
    {id: uuidv4(), text: "تم إطلاق ميزة جديدة في لوحة التحكم!", type: "info", durationDays: 7, publishDate: "2024-03-10", expiryDate: "2024-03-17"},
    {id: uuidv4(), text: "صيانة مجدولة للموقع يوم الجمعة القادم.", type: "warning", durationDays: 3, publishDate: "2024-03-15", expiryDate: "2024-03-18"},
];

const localStorageNotificationsKey = 'blogNotifications';

function Notifications() {
    const [notifications, setNotifications] = useState(() => {
        const storedNotifications = localStorage.getItem(localStorageNotificationsKey);
        return storedNotifications ? JSON.parse(storedNotifications) : initialNotifications;
    });

    const [newNotificationText, setNewNotificationText] = useState('');
    const [newNotificationType, setNewNotificationType] = useState('info');
    const [newNotificationDuration, setNewNotificationDuration] = useState(7); // Default 7 days

    useEffect(() => {
        localStorage.setItem(localStorageNotificationsKey, JSON.stringify(notifications));
    }, [notifications]);

    const handleAddNotification = (e) => {
        e.preventDefault();
        if (!newNotificationText.trim()) {
            alert("نص الإشعار لا يمكن أن يكون فارغًا.");
            return;
        }
        const publishDate = new Date();
        const expiryDate = new Date(publishDate);
        expiryDate.setDate(publishDate.getDate() + parseInt(newNotificationDuration, 10));

        const newNotification = {
            id: uuidv4(),
            text: newNotificationText.trim(),
            type: newNotificationType,
            durationDays: parseInt(newNotificationDuration, 10),
            publishDate: publishDate.toISOString().split('T')[0],
            expiryDate: expiryDate.toISOString().split('T')[0],
        };
        setNotifications([newNotification, ...notifications]);
        setNewNotificationText('');
        setNewNotificationType('info');
        setNewNotificationDuration(7);
    };

    const handleDeleteNotification = (id) => {
        if (window.confirm("هل أنت متأكد أنك تريد حذف هذا الإشعار؟")) {
            setNotifications(notifications.filter(notif => notif.id !== id));
        }
    };

    return (
        <div className="notifications-page">
            <h1>الإشعارات والبث</h1>
            <p>إدارة الإشعارات التي تظهر في شريط الإشعارات أعلى الموقع.</p>

            <section className="settings-section notification-form-section">
                <h2>إضافة إشعار جديد</h2>
                <form onSubmit={handleAddNotification} className="notification-form">
                    <div className="form-group">
                        <label htmlFor="notificationText">نص الإشعار:</label>
                        <textarea
                            id="notificationText"
                            value={newNotificationText}
                            onChange={(e) => setNewNotificationText(e.target.value)}
                            rows="3"
                            required
                        ></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="notificationType">نوع الإشعار:</label>
                        <select
                            id="notificationType"
                            value={newNotificationType}
                            onChange={(e) => setNewNotificationType(e.target.value)}
                        >
                            <option value="info">معلومات (أزرق)</option>
                            <option value="warning">تحذير (أصفر)</option>
                            <option value="error">خطأ/هام (أحمر)</option>
                            <option value="success">نجاح (أخضر)</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="notificationDuration">مدة العرض (بالأيام):</label>
                        <input
                            type="number"
                            id="notificationDuration"
                            value={newNotificationDuration}
                            onChange={(e) => setNewNotificationDuration(e.target.value)}
                            min="1"
                            required
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="button-primary">نشر الإشعار</button>
                    </div>
                </form>
            </section>

            <section className="settings-section current-notifications-section">
                <h2>الإشعارات الحالية والسابقة</h2>
                {notifications.length === 0 ? (
                    <p>لا توجد إشعارات لعرضها.</p>
                ) : (
                    <table className="data-table notifications-table">
                        <thead>
                            <tr>
                                <th>نص الإشعار</th>
                                <th>النوع</th>
                                <th>تاريخ النشر</th>
                                <th>تاريخ الانتهاء</th>
                                <th>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notifications.map(notif => (
                                <tr key={notif.id} className={`notification-type-${notif.type}`}>
                                    <td>{notif.text}</td>
                                    <td>{notif.type}</td>
                                    <td>{notif.publishDate}</td>
                                    <td>{notif.expiryDate}</td>
                                    <td className="actions-cell">
                                        <button
                                            className="button-delete"
                                            onClick={() => handleDeleteNotification(notif.id)}
                                        >
                                            حذف
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </section>
        </div>
    );
}

export default Notifications;
