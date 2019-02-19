import React, { Component } from 'react'
import Title from '../Globals/Title'
import Img from 'gatsby-image'

const getCategories = items => {
  let tempItems = items.map(item => {
    return item.node.category
  });
  let tempCategories = new Set(tempItems);
  let categories = Array.from(tempCategories);
  categories = ['all', ...categories]
  return categories
}; 
export default class Menu extends Component {
  state = {
    items: this.props.items.edges,
    coffeItems: this.props.items.edges,
    categories: getCategories(this.props.items.edges)
  }
  handleItems = (cat) => {
    let tempItems = [...this.state.items];
    if(cat === 'all') {
      this.setState({
        coffeItems: tempItems
      })
    } else {
      let filterItems = tempItems.filter(({node})=>node.category===cat)
      this.setState(() => {
        return {coffeItems: filterItems}
      })
    }
  }
  render() {
  if (this.state.items.length > 0) {
    return (
      <section className="menu py-5">
        <div className="container">
          <Title title="best of our menu"/>

          <div className="row mb-5">
            <div className="col-10 mx-auto text-center">
              {this.state.categories.map((cat, index) => {
                return (
                  <button 
                  key={index}
                  className="btn btn-yellow text-capitalize m-3"
                  type="button"
                  onClick={() => this.handleItems(cat)}
                  >{cat}</button>
                )
              })}
            </div>
          </div>

          <div className="row">
              {this.state.coffeItems.map(({node}) => {
                return (
                  <div 
                  key={node.id}
                  className="col-11 col-md-6 my-3 d-flex mx-auto">
                    <div>
                      <Img fixed={node.image.fixed} />
                    </div>
                    <div className="flex-grow-1 px-3">
                      <div className="d-flex justify-content-between">
                        <h6 className="mb-0">
                          <small>{node.title}</small>
                        </h6>
                        <h6 className="mb-0">
                          <small>${node.price}</small>
                        </h6>
                      </div>
                      <p className="text-muted">
                        <small>{node.description.description}</small>
                      </p>
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </section>
    )
  } else {
    return (
      <section className="menu py-5">
        <div className="container">
          <Title title="best of our menu"/>
          <div className="row">
            <div className="col-10 col-sm-6 mx-auto text-center text-capitalize">
              <h1>There are no items to display</h1>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
}
