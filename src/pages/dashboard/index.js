import Statistics from "./Statistics";

const Dashboard = () => {
  const statistics = [
    {
      text: "Sellers",
      sum: 20,
      icon: "iconly-boldProfile",
      icon_color: "blue",
      url: "/",
    },
    {
      text: "Buyers",
      sum: 200,
      icon: "iconly-boldProfile",
      icon_color: "green",
      url: "/",
    },
    {
      text: "Services",
      sum: 60,
      icon: "iconly-boldWork",
      icon_color: "purple",
      url: "/",
    },
    {
      text: "Categories",
      sum: 10,
      icon: "iconly-boldCategory",
      icon_color: "red",
      url: "/categories/view",
    },
  ];

  return (
    <>
      <div className="page-heading">
        <h3>Profile Statistics</h3>
      </div>
      <div className="page-content">
        <div className="row">
          {statistics.map((stat, i) => {
            return (
              <div className="col-6 col-lg-3 col-md-6" key={i}>
                <Statistics stat={stat} />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
