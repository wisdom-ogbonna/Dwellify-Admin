import DateUtils from "../utils/DateFormats";

function Footer() {
  
  return (
    <footer>
      <p className="text-black absolute bottom-7 left-[50%] translate-x-[-50%] text-center text-sm font-medium">
        Copyright &copy; {DateUtils.getCurrentYear()} Bytemark Studio.
      </p>
    </footer>
  );
}

export default Footer;
