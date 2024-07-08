export const convertOptions = (array) => {
  const mappedArray = array.map((item) => ({
    label:
      item.title ||
      item.typeName ||
      item.levelName ||
      item.statusName ||
      item.classRoomName ||
      item.fullName ||
      item.termName ||
      item.techName ||
      item.categoryName,
    value: item.id || item.teacherId || item.courseId,
  }));

  return mappedArray;
};
