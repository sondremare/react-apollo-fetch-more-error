import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class App extends Component {
  render() {
    const { error, loading, loadingMore, loadMorePeople, people } = this.props;

    return (
      <main>
        <header>
          <h1>Apollo Client Error Template</h1>
          <p>
            This is a template that you can use to demonstrate an error in Apollo Client.
            Edit the source code and watch your browser window reload with the changes.
          </p>
          <p>
            The code which renders this component lives in <code>./src/App.js</code>.
          </p>
          <p>
            The GraphQL schema is in <code>./src/graphql/schema</code>.
            Currently the schema just serves a list of people with names and ids.
          </p>
        </header>
        {
          error && (
            <h2 style={{color: 'red'}}>Error</h2>
          )
        }
        {loading ? (
          <p>Loading…</p>
        ) : (
          <div>
            <ol>
              {people.map(person => (
                <li key={person.id}>
                  {person.name}
                </li>
              ))}
            </ol>
            <button
              disabled={loadingMore}
              onClick={loadMorePeople}>{ !loadingMore ? 'Fetch more' : 'Loading…' }</button>
          </div>
        )}
      </main>
    );
  }
}

export default graphql(
  gql`
  query ($cursor: Int, $limit: Int) {
    people (cursor: $cursor, limit: $limit) {
      id
      name
    }
  }
  `,
  {
    options: {
      notifyOnNetworkStatusChange: true,
      variables: {
        cursor: 0,
        limit: 10,
      }
    },
    props: ({data: {people, fetchMore, networkStatus, ...props}}) => ({
      ...props,
      networkStatus,
      people,
      loading: networkStatus === 1,
      loadingMore: networkStatus === 3,
      loadMorePeople () {
        return fetchMore({
          updateQuery: (previousQuery, {fetchMoreResult}) => {
            if (fetchMoreResult.people === undefined) {
              return previousQuery;
            }

            return {
              people: [
                ...previousQuery.people,
                ...fetchMoreResult.people,
              ],
            };
          },
          variables: {cursor: people.length},
        });
      },
    }),
  },
)(App)
