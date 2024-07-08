export const renderRoleName = (roles) => {
  if (roles?.includes("Administrator")) {
    return "مدیر";
  } else if (roles?.includes("Teacher")) {
    return "استاد";
  } else if (roles?.includes("Student")) {
    return "دانشجو";
  } else if (roles?.includes("Employee.Admin")) {
    return "کارمند.ادمین";
  } else if (roles?.includes("Employee.Writer")) {
    return "کارمند.نویسنده";
  } else if (roles?.includes("CourseAssistance")) {
    return "دستیار دوره";
  } else if (roles?.includes("TournamentAdmin")) {
    return "ادمین تورنومنت";
  } else if (roles?.includes("Referee")) {
    return "داور";
  } else if (roles?.includes("TournamentMentor")) {
    return "پشتیبان تورنومنت";
  } else if (roles?.includes("Support")) {
    return "پشتیبان";
  } else {
    return "کاربر نابغه";
  }
};
