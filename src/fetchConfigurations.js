import fetch from 'node-fetch';

const { HYGRAPH_API, HYGRAPH_AUTH } = process.env;
const query = `{
	experimentConfigurations {
    experimentId
    experimentName
    experimentGlobal
    isolate {
      ... on IsolateRedirect {
        type
      }
      ... on IsolateSegment {
        layer
      }
    }
    filter {
      rule
      filterGroup {
        ... on FilterGroup {
          filterGroup {
            ... on FilterGroup {
              rule
              filterGroup {
                ... on FilterGroup {
                  stage
                  rule
                }
                ... on FilterUrlParameter {
                  inverse
                  key
                  type
                  value
                }
                ... on FilterUrlPath {
                  inverse
                  path
                  type
                }
              }
            }
            ... on FilterUrlParameter {
              key
              type
              inverse
              value
            }
            ... on FilterUrlPath {
              path
              inverse
              type
            }
          }
          rule
        }
        ... on FilterUrlPath {
          id
          type
          path
          inverse
        }
        ... on FilterUrlParameter {
          id
          inverse
          key
          value
          type
        }
      }
    }
  }
}`;

const fetchConfigurations = async () => {
  try {
    const response = await fetch(HYGRAPH_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${HYGRAPH_AUTH}`,
      },
      body: JSON.stringify({ query }),
    });

    return await response.json();
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export { fetchConfigurations };
