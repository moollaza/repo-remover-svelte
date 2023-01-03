const repoQuery = `
query($login: String!, $after: String) {
  user(login: $login) {
    id
    name
    login
    avatarUrl
    bioHTML
    repositories(
      first: 100
      after: $after
      ownerAffiliations: [OWNER, ORGANIZATION_MEMBER, COLLABORATOR]
    ) {
      totalCount
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        id
        viewerCanAdminister
        name
        description
        isFork
        isPrivate
        isArchived
        isInOrganization
        updatedAt
        pushedAt
        url
        parent {
          nameWithOwner
          url
        }
        owner {
          login
          url
        }
      }
    }
  }
}
`;

const viewerQuery = `
query {
  viewer {
    id
    name
    login
  }
}`;

export function buildUserQuery() {
	return JSON.stringify({
		query: viewerQuery
	});
}

interface RepoQueryParams {
	login: string;
	after?: string;
}

export function buildRepoQuery(queryParams: RepoQueryParams) {
	if (!queryParams.login) {
		throw new Error('Login name required for API call');
	}

	return JSON.stringify({
		query: repoQuery,
		variables: queryParams
	});
}
