import React from "react";
import { useTranslation } from "react-i18next";
import "./i18next";

const ChangeLanguageTest = () => {
  const { i18n } = useTranslation();

  function handleClick(lang) {
    i18n.changeLanguage(lang);
  }
  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="ml-auto row">
          <div className="nav-item col-auto">
            <button onClick={()=>handleClick('en')}>English</button>
          </div>
          <div className="nav-item col-auto">
            <button onClick={()=>handleClick('th')}>Thai</button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default ChangeLanguageTest;
