class DateUtils {

  static formatDate(date) {
    if (!date) return "N/A";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  }

  static getCurrentYear() {
    return new Date().getFullYear();
  }

  static getTodayLong() {
    return new Date().toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }
}

export default DateUtils;
