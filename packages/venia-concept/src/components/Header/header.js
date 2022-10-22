import React, {Fragment, Suspense} from 'react';
import {shape, string} from 'prop-types';
import {Link, Route} from 'react-router-dom';

import Logo from '../Logo';
import AccountTrigger from './accountTrigger';
import CartTrigger from './cartTrigger';
import NavTrigger from './navTrigger';
import SearchTrigger from './searchTrigger';
import OnlineIndicator from './onlineIndicator';
import {useHeader} from '@magento/peregrine/lib/talons/Header/useHeader';
import resourceUrl from '@magento/peregrine/lib/util/makeUrl';

import {useStyle} from '@magento/venia-ui/lib/classify';
import defaultClasses from './header.module.css';
import MegaMenu from '@magento/venia-ui/lib/components/MegaMenu';
import PageLoadingIndicator from '@magento/venia-concept/src/components/PageLoadingIndicator';
import {FormattedMessage, useIntl} from 'react-intl';
import {PhoneCall, Instagram, Youtube} from 'react-feather';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTelegram} from '@fortawesome/free-brands-svg-icons'

const SearchBar = React.lazy(() => import('@magento/venia-ui/lib/components/SearchBar'));

const Header = props => {
    const {
        handleSearchTriggerClick,
        hasBeenOffline,
        isOnline,
        isSearchOpen,
        searchRef,
        searchTriggerRef
    } = useHeader();

    const classes = useStyle(defaultClasses, props.classes);
    const rootClass = isSearchOpen ? classes.open : classes.closed;

    const searchBarFallback = (
        <div className={classes.searchFallback} ref={searchRef}>
            <div className={classes.input}>
                <div className={classes.loader}>
                    <div className={classes.loaderBefore}/>
                    <div className={classes.loaderAfter}/>
                </div>
            </div>
        </div>
    );
    const searchBar = isSearchOpen ? (
        <Suspense fallback={searchBarFallback}>
            <Route>
                <SearchBar isOpen={isSearchOpen} ref={searchRef}/>
            </Route>
        </Suspense>
    ) : null;

    const {formatMessage} = useIntl();
    const title = formatMessage({id: 'logo.title', defaultMessage: 'Venia'});
    const phoneNumber = '+380951002478'

    return (
        <Fragment>
            <div className={classes.switchersContainer}>
                <div className={classes.switchers}>
                    <div className={classes.phoneNumber}>
                        <a href="/">{phoneNumber}</a>
                        <PhoneCall size={15}/>
                    </div>
                    <span className={classes.deliveryText}>
                        <FormattedMessage
                            id="header.delivery"
                            defaultMessage="Доставка по всій Україні"
                        />
                        {/* eslint-disable-next-line jsx-a11y/accessible-emoji,react/jsx-no-literals */}
                        <span>🇺🇦</span>
                    </span>
                    <div className={classes.socialMedia}>
                        <Instagram size={15}/>
                        <Youtube size={15}/>
                        <FontAwesomeIcon icon={faTelegram}/>
                    </div>
                </div>
            </div>
            <header className={rootClass} data-cy="Header-root">
                <div className={classes.toolbar}>
                    <div className={classes.primaryActions}>
                        <NavTrigger/>
                    </div>
                    <OnlineIndicator
                        hasBeenOffline={hasBeenOffline}
                        isOnline={isOnline}
                    />
                    <Link
                        aria-label={title}
                        to={resourceUrl('/')}
                        className={classes.logoContainer}
                        data-cy="Header-logoContainer"
                    >
                        <Logo classes={{logo: classes.logo}}/>
                    </Link>
                    <MegaMenu/>
                    <div className={classes.secondaryActions}>
                        <SearchTrigger
                            onClick={handleSearchTriggerClick}
                            ref={searchTriggerRef}
                        />
                        <AccountTrigger/>
                        <CartTrigger/>
                    </div>
                </div>
                {searchBar}
                <PageLoadingIndicator absolute/>
            </header>
        </Fragment>
    );
};

Header.propTypes = {
    classes: shape({
        closed: string,
        logo: string,
        open: string,
        primaryActions: string,
        secondaryActions: string,
        toolbar: string,
        switchers: string,
        switchersContainer: string
    })
};

export default Header;
