import React from 'react';

const CaptainHome = () => {
    return (
        <div
            style={{
                minHeight: '100vh',
                background: '#000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'Segoe UI, Arial, sans-serif',
            }}
        >
            <div
                style={{
                    background: '#111',
                    borderRadius: '20px',
                    boxShadow: '0 8px 32px 0 rgba(0,0,0,0.37)',
                    padding: '48px 32px',
                    textAlign: 'center',
                    maxWidth: '400px',
                    width: '100%',
                    border: '1px solid #fff',
                }}
            >
                <h1
                    style={{
                        fontSize: '2.5rem',
                        color: '#fff',
                        marginBottom: '16px',
                        letterSpacing: '2px',
                        fontWeight: 700,
                        textShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    }}
                >
                    Welcome, Captain!
                </h1>
                <p
                    style={{
                        fontSize: '1.2rem',
                        color: '#fff',
                        marginBottom: '32px',
                        fontWeight: 500,
                    }}
                >
                    This is your home page. Ready for your next adventure?
                </p>
                <button
                    style={{
                        padding: '12px 32px',
                        fontSize: '1rem',
                        borderRadius: '8px',
                        border: '2px solid #fff',
                        background: '#000',
                        color: '#fff',
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                        transition: 'transform 0.2s, background 0.2s, color 0.2s',
                    }}
                    onMouseOver={e => {
                        e.currentTarget.style.transform = 'scale(1.05)';
                        e.currentTarget.style.background = '#fff';
                        e.currentTarget.style.color = '#000';
                    }}
                    onMouseOut={e => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.background = '#000';
                        e.currentTarget.style.color = '#fff';
                    }}
                >
                    Start Journey
                </button>
            </div>
        </div>
    );
};

export default CaptainHome;