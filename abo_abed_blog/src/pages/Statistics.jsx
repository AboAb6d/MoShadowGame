import React from 'react';

function Statistics() {
  return (
    <div className="statistics-page">
      <h1>الإحصائيات والتحليلات</h1>
      <p>نظرة عامة على أداء مدونتك وتفاعل الزوار.</p>

      <div className="stats-cards-container">
        <div className="stat-card">
          <h3>إجمالي الزوار (آخر 30 يومًا)</h3>
          <p className="stat-value">1,234</p>
          <span className="stat-change positive">+5.2%</span>
        </div>
        <div className="stat-card">
          <h3>متوسط وقت بقاء الزائر</h3>
          <p className="stat-value">2:30 دقيقة</p>
          <span className="stat-change negative">-1.5%</span>
        </div>
        <div className="stat-card">
          <h3>أكثر المقالات قراءة</h3>
          <p className="stat-value">مقدمة في الذكاء الاصطناعي</p>
          <span>(150 مشاهدة)</span>
        </div>
        <div className="stat-card">
          <h3>عدد التعليقات الجديدة</h3>
          <p className="stat-value">25</p>
          <span className="stat-change positive">+10</span>
        </div>
      </div>

      <div className="charts-placeholder">
        <h2>الرسوم البيانية (Placeholder)</h2>
        <div className="chart-item">
          <p>رسم بياني لعدد الزيارات اليومية</p>
          <img src="https://via.placeholder.com/600x300.png?text=Daily+Visits+Chart" alt="رسم بياني للزيارات اليومية" style={{maxWidth: '100%', borderRadius: '5px'}} />
        </div>
        <div className="chart-item">
          <p>رسم بياني لمصادر الزيارات</p>
          <img src="https://via.placeholder.com/600x300.png?text=Traffic+Sources+Chart" alt="رسم بياني لمصادر الزيارات" style={{maxWidth: '100%', borderRadius: '5px'}} />
        </div>
      </div>
    </div>
  );
}

export default Statistics;
