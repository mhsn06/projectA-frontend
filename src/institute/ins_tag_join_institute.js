import React, { Component, Suspense } from 'react';
import $ from 'jquery';
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Route, Link, Redirect, Switch } from "react-router-dom";
import { withRouter } from 'react-router-dom';
import { Breadcrumbs, BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { TaskLoader } from "./ins_common_lib";


class JoinInstituteTag extends Component {

    state = { show_page_create_form: false, message: "Create a page", isLoggedIn: true }

    toggle_page_create() {
        this.setState({ show_page_create_form: true, message: "Enter the required information." });
    }
    onCancelHandle() {
        this.setState({ show_page_create_form: false });
    }

    onPageCreateHandler(data) {
        this.setState({ pageCreateResponse: data });
    }

    onCreatePageHandle(data) {
        this.setState({
            show_page_create_form: false,
            message: "Page Created successfully"
        });
    }

    render() {
        const CreateInstitutePageForm = React.lazy(() => import('./' + 'ins_task_create_page'));
        const JoinByRequest = React.lazy(() => import('./' + 'ins_task_joinbyrequest'));
        let { associated } = this.props;
        console.log(associated);

        return (
            <div>
                <BreadcrumbsItem to={"/s/eduman/tg/" + "ins_tag_join_institute"}>Join Institute</BreadcrumbsItem>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route exact path={"/s/eduman/tg/" + "ins_tag_join_institute"}>
                            <div>
                                <p>You can join your institute by submitting a join request. First find your page. if not found you can create one.</p>
                                <Search />
                                {/*<hr />
              <p>Or if you already have a invitation to join your institute.</p>
              <JoinByInvitation/> */}
                            </div>
                        </Route>
                        <Route path="/s/eduman/tg/ins_tag_join_institute/t/ins_task_create_page" component={CreateInstitutePageForm} />
                        <Route path="/s/eduman/tg/ins_tag_join_institute/t/ins_task_joinbyrequest" component={JoinByRequest} />
                    </Switch>
                </Suspense>
            </div>
        );
    }
}

class Search extends Component {

    baz(e) {
        e.preventDefault();
    }

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            login_in_progress: false,
            search_result: [
                { id: "brur_rangpur", title: "Begum Rokeya University", address: "Rangpur" },
            ],
            show_search_result: true
        };
    }

    render() {
        const { login_in_progress } = this.state;
        var search_from = <form>
            <div className="form-row align-items-center">
                <div className="col-auto">
                    <input type="text" className="form-control mb-2" id="key" placeholder="Enter your institute name" />
                </div>
                <div className="col-auto">
                    <button onClick={(e) => this.baz(e)} type="submit" className="btn btn-primary mb-2">Find</button>
                </div>
            </div>
        </form>
        var loader_text = login_in_progress ? "Loading..." : ""
        const { search_result } = this.state;
        var result = "";
        /*
        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Cras justo odio
            <span class="badge badge-success badge-pill">Present</span>
          </li>
        */

        if (this.state.show_search_result) {
            if (search_result.length)
                result = <div>
                    <p>Found 1 possible match. Click to join.</p>
                    <div class="list-group">{search_result.map((key, index) => {
                    return <div>
                        <Link to={"/s/eduman/tg/ins_tag_join_institute/t/ins_task_joinbyrequest"} class="list-group-item list-group-item-action">
                        
                        <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">{key["title"]}</h5>
                                <small class="text-muted">Managed by Institute</small>
                            </div>
                            <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
                            <small class="text-muted">Donec id elit non mi porta.</small>
                        </Link>
                        </div>
                })}</div></div>;
            else {
                result = <Link to="/s/eduman/tg/ins_tag_join_institute/t/ins_task_create_page">Create Institute Public Page</Link>
            }
        }
        return (
            <div>
                {search_from}
                {loader_text}
                {result}
            </div>
        );
    }
}

class JoinByInvitation extends Component {
    render() {
        return (
            <div>
                <form>
                    <div className="form-row align-items-center">
                        <div className="col-auto">
                            <input type="text" className="form-control mb-2" id="key" placeholder="Enter invitation code" />
                        </div>
                        <div className="col-auto">
                            <button onClick={(e) => this.baz(e)} type="submit" className="btn btn-primary mb-2">Find</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default JoinInstituteTag;