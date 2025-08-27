import React from 'react';

const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '80vh',
      textAlign: 'center'
    }}>
      <h1>404</h1>
      <p>페이지를 찾을 수 없습니다.</p>
      <p>요청하신 페이지가 존재하지 않거나, 다른 주소로 이동되었을 수 있습니다.</p>
      <a href="/" style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>홈으로 돌아가기</a>
    </div>
  );
};

export default NotFound;

