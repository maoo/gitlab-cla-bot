const requestp = require("./requestAsPromise");

// TODO : Remove the use of private token
exports.gitlabRequest = (opts, token, method = "POST") =>
  requestp(
    Object.assign(
      {},
      {
        json: true,
        headers: {
          "Private-Token": `${token}`,
          "User-Agent": "gitlab-cla-bot"
        },
        method
      },
      opts
    )
  );

  exports.getCommits = (projectId, mergeRequestId) => ({
    url: `https://gitlab.com/api/v4/projects/${projectId}/merge_requests/${mergeRequestId}/commits`,
    method: "GET"
  });

  exports.getProjectClaFile = (projectId) => ({
    // TODO : Assumes master branch, which is probably not acceptable
    url: `https://gitlab.com/api/v4/projects/${projectId}/repository/files/%2Eclabot/raw?ref=master`,
    method: "GET"
  });

  exports.addComment = (projectId, mergeRequestId, comment) => ({
    url: `https://gitlab.com/api/v4/projects/${projectId}/merge_requests/${mergeRequestId}/notes`,
    body: {
      body: comment
    }
  });

  exports.getMergeRequest = (projectId, mergeRequestId) => ({
    url: `https://gitlab.com/api/v4/projects/${projectId}/merge_requests/${mergeRequestId}`,
    method: "GET"
  });
  
  exports.approveMergeRequest = (projectId, mergeRequestId, sha) => ({
    url: `https://gitlab.com/api/v4/projects/${projectId}/merge_requests/${mergeRequestId}/approve`,
    body: {
      sha: sha
    }
  });

  exports.unapproveMergeRequest = (projectId, mergeRequestId) => ({
    url: `https://gitlab.com/api/v4/projects/${projectId}/merge_requests/${mergeRequestId}/unapprove`
  });

  exports.getProjectLabels = (projectId) => ({
    url: `https://gitlab.com/api/v4/projects/${projectId}/labels`,
    method: "GET"
  });

  exports.createProjectLabel = (projectId, label) => ({
    url: `https://gitlab.com/api/v4/projects/${projectId}/labels`,
    body: {
      name: label,
      color: "green"      
    }
  });

  exports.updateMergeRequestLabels = (projectId, mergeRequestId, labels) => ({
    url: `https://gitlab.com/api/v4/projects/${projectId}/merge_requests/${mergeRequestId}`,
    method: "PUT",
    body: {
      labels: labels
    }
  });