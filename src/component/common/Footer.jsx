import React, { useState } from 'react';

const FooterComponent = () => {
    const [isHovered, setIsHovered] = useState(false);

    const footerStyle = {
        color: '#f0e8e8',
        background: isHovered
            ? 'linear-gradient(135deg, #2c3e50, #34495e)'  // Darker gradient on hover
            : 'linear-gradient(135deg, #34495e, #2c3e50)',  // Original gradient
        padding: '40px 20px',
        textAlign: 'center',
        width: '100%',
        fontWeight: '500',
        fontSize: '1.2rem',
        lineHeight: '1.8',
        position: 'relative',
        boxShadow: '0 -5px 15px rgba(0, 0, 0, 0.2)',
        borderTop: '1px solid #555',
        transition: 'background 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        marginTop: '20px',
    };

    const footerTextStyle = {
        fontFamily: 'Arial, sans-serif',
        fontSize: '1rem',
        marginBottom: '10px',
    };

    const footerLinkStyle = {
        color: '#f0e8e8',
        textDecoration: 'none',
        fontWeight: '600',
        transition: 'color 0.3s ease-in-out',
    };

    const footerLinkHoverStyle = {
        color: '#e67e22',  // Change color on hover
    };

    return (
        <footer>
            <div
                className="my-footer"
                style={footerStyle}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div style={footerTextStyle}>
                    <p>
                        <strong>Aline UWINEZA</strong>, AUCA Webtechnology
                    </p>
                    <p>
                        All Rights Reserved &copy; {new Date().getFullYear()}
                    </p>
                </div>
                <div>
                    <p>
                        <a
                            href="https://www.auca.ac.rw"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={footerLinkStyle}
                            onMouseEnter={(e) => (e.target.style.color = footerLinkHoverStyle.color)}
                            onMouseLeave={(e) => (e.target.style.color = footerLinkStyle.color)}
                        >
                            Visit AUCA
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default FooterComponent;
