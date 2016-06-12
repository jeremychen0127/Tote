import React from 'react';
import { mount } from 'react-mounter';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Layout } from '../../ui/layouts/Layout';
import { WelcomeLayout } from '../../ui/layouts/WelcomeLayout';
import Welcome from '../../ui/pages/Welcome';
import Closet from '../../ui/pages/Closet';
import Recommendations from '../../ui/pages/Recommendations';
import AWSDemo from '../../ui/pages/AWSDemo';

FlowRouter.route('/', {
  name: 'index',
  action() {
    mount(WelcomeLayout, {content: <Welcome />});
  }
});

FlowRouter.route('/closet', {
  name: 'closet',
  action() {
    mount(Layout, {content: <Closet />});
  }
});

FlowRouter.route('/recommendations', {
  name: 'recommendations',
  action() {
    mount(Layout, {content: <Recommendations />});
  }
});

FlowRouter.route('/AWSDemo', {
  name: 'AWSDemo',
  action() {
    mount(Layout, {content: <AWSDemo />});
  }
});

FlowRouter.route('/diary', {
  name: 'diary',
  action() {
    mount(Layout, {content: <div />});
  }
});