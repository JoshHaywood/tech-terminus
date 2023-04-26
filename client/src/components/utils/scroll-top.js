import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0; //Scroll to top of page for unsupported browsers
    document.body.scrollTop = 0; //Scroll to top of page
  }, [pathname]);

  return null;
};