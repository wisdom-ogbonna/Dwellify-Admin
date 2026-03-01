import { useState } from "react";

function Footer() {
  const [year] = useState(new Date().getFullYear());

  return (
    <footer>
      <p className="text-black absolute bottom-7 left-[50%] translate-x-[-50%] text-center">
        {year} &copy; Bytemark Studio.
      </p>
    </footer>
  );
}

export default Footer;