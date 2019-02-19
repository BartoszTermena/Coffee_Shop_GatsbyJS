import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BackgroundSection from '../components/Globals/BackgroundSection';
import Info from '../components/Home/Info'
import Menu from '../components/Home/Menu'
import Products from '../components/Home/Products'

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <BackgroundSection 
    img={data.img.childImageSharp.fluid} 
    title="Coffee Shop"
    styleClass="default-background"
    />
    <Info />
    <Menu items={data.menu}/>
    <Products />
  </Layout>
)

export const query = graphql`
{
  img: file(relativePath: {eq: "roastcoffee.jpg"}) {
    childImageSharp {
      fluid (quality: 100, maxWidth: 4160) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
  menu:allContentfulItems {
    edges {
      node {
        id
        title
        price
        category
        description{
          description
        }
        image {
          fixed (width:50, height: 50){
            ...GatsbyContentfulFixed_tracedSVG
          }
        }
      }
    }
  }
}
`;

export default IndexPage
