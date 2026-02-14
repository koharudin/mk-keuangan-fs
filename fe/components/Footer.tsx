import React from "react";

const Footer: React.FC = () => {
    const year: number = new Date().getFullYear();

    return (
        <footer className="content-footer footer bg-footer-theme">
            <div className="container-xxl">
                <div className="footer-container d-flex align-items-center justify-content-between py-4 flex-md-row flex-column">
                    <div className="text-body">
                        © {year}, made with ❤️ by{" "}
                        <a
                            href="https://mediakolaborasi.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer-link"
                        >
                            Media Kolaborasi
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
