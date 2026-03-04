class DateUtils {
  static formatDate = (timestamp) => {
    if (!timestamp?._seconds) return "N/A";
    return new Date(timestamp._seconds * 1000).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

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
