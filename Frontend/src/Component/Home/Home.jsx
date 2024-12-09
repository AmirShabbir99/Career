import { useContext } from "react"
import { Context } from "../../main"
import HomeSection from "./HomeSection.jsx";
import HowItWorks from "./HowItWorks.jsx";
import PopularCategory from "./PopularCategory.jsx";
import PopularCompany from "./PopularCompany.jsx";
import { Navigate } from "react-router-dom";

const Home = () => {
  const {isAuthorized}=useContext(Context)
  if(!isAuthorized)
  {
    console.log(isAuthorized)
    return <Navigate to={'/login'} replace />
  }
  return (
    <>
    <section>
      <div className="homePage page">
        <HomeSection></HomeSection>
        <HowItWorks></HowItWorks>
        <PopularCategory></PopularCategory>
        <PopularCompany></PopularCompany>
      </div>
    </section>
    </>
  )
}

export default Home