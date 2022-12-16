import React, { PureComponent } from "react";
import styled from "styled-components";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import _map from "lodash/map";
import AddIconToLibrary from "../../utils/fontAwesomeIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { ROUTE_OVERVIEW } from "../../../router/routes";
AddIconToLibrary([faHome]);

const Container = styled.div`
  .breadcrumb {
    background-color: transparent;
    font-size: 15px;
    padding: 0;
  }

  .fa-home {
    color: #88969f;
    font-size: 16px;
  }

  .active.fa-home {
    color: #6b7dc0;
  }

  li {
    color: #88969f;
    font-weight: 500 !important;
  }

  .active.breadcrumb-item {
    color: #6b7dc0;
    font-weight: 600 !important;
  }
`;

class Breadcrumbs extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const { active, data } = this.props;
    return (
      <Container>
        <Breadcrumb listTag="div">
          <Link to={ROUTE_OVERVIEW}>
            <FontAwesomeIcon
              className={!active ? "active" : ""}
              icon={["fas", "home"]}
            />
          </Link>
          <BreadcrumbItem />
          {_map(data, (list, index) => (
            <BreadcrumbItem key={index} className={index === 0 ? "active" : ""}>
              {list}
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </Container>
    );
  }
}

export default Breadcrumbs;
