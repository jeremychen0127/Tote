import React from 'react';
import { mount } from 'react-mounter';
import { FlowRouter } from 'meteor/kadira:flow-router';

import { Layout } from '../../ui/layouts/Layout';

FlowRouter.route('/', {
  name: 'index',
  triggersEnter: [function(context, redirect) {
    redirect('/closet');
  }]
});

FlowRouter.route('/closet', {
  name: 'closet',
  action() {
    mount(Layout, {content: <div />});
  }
});

FlowRouter.route('/recommendations', {
  name: 'recommendations',
  action() {
    mount(Layout, {content: <div />});
  }
});

FlowRouter.route('/diary', {
  name: 'diary',
  action() {
    mount(Layout, {content: <div />});
  }
});