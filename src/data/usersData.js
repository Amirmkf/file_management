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

export default [
  {
    username: "Admin",
    creator: "",
    firstName: "",
    lastName: "",
    creationTime: getDateTime(),
    type: "admin",
    lastModifier: "admin",
    lastModificationTime: getDateTime(),
    groupName: "",
    themeColor: "blue",
    locale: 'EN',
    storage: {
      name: "/",
      path: "/",
      folders: [],
      files: [],
    },
  },
];
