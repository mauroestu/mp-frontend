import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {getApiBaseUrl} from '../../../utils';

const Footer = () => {
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <Link className="navbar-brand" to="/">
          Ministerio Público
        </Link>
      </nav>
    </>
  );
};

export default Footer;
