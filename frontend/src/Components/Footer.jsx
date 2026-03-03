import DateUtils from "../utils/DateFormats";

function Footer() {
  
  return (
    <footer>
      <p className="text-black text-center text-sm font-medium">
        Copyright &copy; {DateUtils.getCurrentYear()} Bytemark Studio.
      </p>
    </footer>
  );
}

export default Footer;
