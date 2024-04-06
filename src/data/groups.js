const getDateTime = function () {
  return new Date().toLocaleString("en-US", {
    day: "2-digit",
    hour12: true,
    month: "2-digit",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};
//

export default [
  {
    name: "test1",
    users: [],
    creator: "admin",
    creationTime: getDateTime(),
    lastModifier: "admin",
    lastModificationTime: getDateTime(),
  },
  {
    name: "test 2",
    users: [],
    creator: "admin",
    creationTime: getDateTime(),
    lastModifier: "admin",
    lastModificationTime: getDateTime(),
  },
  {
    name: "test 3",
    users: [],
    creator: "admin",
    creationTime: getDateTime(),
    lastModifier: "admin",
    lastModificationTime: getDateTime(),
  },
];
