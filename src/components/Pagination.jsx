import React, { useEffect, useState } from "react";
import { Pagination, PaginationItem } from '@material-ui/lab';
import useStyles from './styles';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../actions/posts";

const Paginate = ({ page }) => {
    const classes = useStyles();
    const { numberOfPages, currentPage } = useSelector((state) => state.posts);
    // let prevPageNo = Number((new URLSearchParams(useLocation().search))?.get('page'));
    //if (prevPageNo === 0) prevPageNo = 1;
    const dispatch = useDispatch();
    //let search = useLocation().search
    useEffect(() => {
        if (page) dispatch(getPosts(page));
    }, [page]);

    return (
        <Pagination
            classes={{ ul: classes.ul }}
            count={numberOfPages}
            page={Number(page) || 1}
            variant="outlined"
            color="primary"
            renderItem={(item) => (
                <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
            )}>
        </Pagination>
    );
}

export default Paginate;