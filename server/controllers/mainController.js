// GET

// homepage

exports.homepage = async (req, res) => {
  const locals = {
    title: "NodeJS Notes App",
    description: "NodeJS Notes App",
  };

  res.render("index", locals);
};


// GET

// Aboutpage

exports.about = async (req, res) => {
  const locals = {
    title: "About - NodeJS Notes App",
    description: "NodeJS Notes App",
  };

  res.render("about", locals);
};
