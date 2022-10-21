import React from 'react';
import { shape, string } from 'prop-types';
import { Search as SearchIcon } from 'react-feather';

import Icon from '@magento/venia-ui/lib/components/Icon';

import { useStyle } from '@magento/venia-ui/lib/classify';
import defaultClasses from './searchTrigger.module.css';
import { useSearchTrigger } from '@magento/peregrine/lib/talons/Header/useSearchTrigger';

const SearchTrigger = React.forwardRef((props, ref) => {
    const { active, onClick } = props;

    const talonProps = useSearchTrigger({
        onClick
    });
    const { handleClick } = talonProps;

    const classes = useStyle(defaultClasses, props.classes);

    const searchClass = active ? classes.open : classes.root;

    return (
        <button
            className={searchClass}
            data-cy="SearchTrigger-button"
            onClick={handleClick}
            ref={ref}
        >
            <Icon src={SearchIcon} />
        </button>
    );
});

SearchTrigger.propTypes = {
    classes: shape({
        root: string,
        open: string
    })
};

export default SearchTrigger;
