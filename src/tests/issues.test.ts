import { Issue } from "@/types";
import { doneFilter, inProgressFilter, findDifferentElements, sortIssues } from "../components/utils/issues";

describe("doneFilter", () => {
  it('should return true, if the key "state" has value "closed"', () => {
    const testIssue: Issue = {
      id: "2855418535",
      state: "closed",
      title: "[React 19]",
      body: "## Summary\n\n<!--\n  Please provide a CodeSandbox (https://codesandbox.io/s/new), a link to a\n  repository on GitHub, or provide a minimal code example that reproduces the\n  problem. You may provide a screenshot of the application if you think it is\n  relevant to your bug report. Here are some tips for providing a minimal\n  example: https://stackoverflow.com/help/mcve.\n-->\n",
      assignee: null,
      assignees: [],
      html_url: "https://github.com/facebook/react/issues/32390",
    };
    expect(doneFilter(testIssue)).toBe(true);
  });
  it('should return false if the key "state" has value "open"', () => {
    const testIssue: Issue = {
      id: "2855418535",
      state: "open",
      title: "[React 19]",
      body: "## Summary\n\n<!--\n  Please provide a CodeSandbox (https://codesandbox.io/s/new), a link to a\n  repository on GitHub, or provide a minimal code example that reproduces the\n  problem. You may provide a screenshot of the application if you think it is\n  relevant to your bug report. Here are some tips for providing a minimal\n  example: https://stackoverflow.com/help/mcve.\n-->\n",
      assignee: null,
      assignees: [],
      html_url: "https://github.com/facebook/react/issues/32390",
    };
    expect(doneFilter(testIssue)).toBe(false);
  });
});

describe("inProgressFilter", () => {
  it("should return true if assignee is !null || or assignees.length !== 0", () => {
    const testAssignedIssue: Issue = {
      id: "2853647689",
      state: "open",
      title: "Citing Sources",
      body: "It would be amazing if there was inline citation of sources when doing deep research (extreme mode), so that it would be clear from where the LLM was getting what information in its response. ",
      assignee: {
        login: "zaidmukaddam",
        id: "76097144",
        node_id: "MDQ6VXNlcjc2MDk3MTQ0",
        avatar_url: "https://avatars.githubusercontent.com/u/76097144?v=4",
        gravatar_id: "",
        url: "https://api.github.com/users/zaidmukaddam",
        html_url: "https://github.com/zaidmukaddam",
        followers_url: "https://api.github.com/users/zaidmukaddam/followers",
        following_url:
          "https://api.github.com/users/zaidmukaddam/following{/other_user}",
        gists_url: "https://api.github.com/users/zaidmukaddam/gists{/gist_id}",
        starred_url:
          "https://api.github.com/users/zaidmukaddam/starred{/owner}{/repo}",
        subscriptions_url:
          "https://api.github.com/users/zaidmukaddam/subscriptions",
        organizations_url: "https://api.github.com/users/zaidmukaddam/orgs",
        repos_url: "https://api.github.com/users/zaidmukaddam/repos",
        events_url:
          "https://api.github.com/users/zaidmukaddam/events{/privacy}",
        received_events_url:
          "https://api.github.com/users/zaidmukaddam/received_events",
        type: "User",
        user_view_type: "public",
        site_admin: "false",
      },
      assignees: [
        {
          login: "zaidmukaddam",
          id: "76097144",
          node_id: "MDQ6VXNlcjc2MDk3MTQ0",
          avatar_url: "https://avatars.githubusercontent.com/u/76097144?v=4",
          gravatar_id: "",
          url: "https://api.github.com/users/zaidmukaddam",
          html_url: "https://github.com/zaidmukaddam",
          followers_url: "https://api.github.com/users/zaidmukaddam/followers",
          following_url:
            "https://api.github.com/users/zaidmukaddam/following{/other_user}",
          gists_url:
            "https://api.github.com/users/zaidmukaddam/gists{/gist_id}",
          starred_url:
            "https://api.github.com/users/zaidmukaddam/starred{/owner}{/repo}",
          subscriptions_url:
            "https://api.github.com/users/zaidmukaddam/subscriptions",
          organizations_url: "https://api.github.com/users/zaidmukaddam/orgs",
          repos_url: "https://api.github.com/users/zaidmukaddam/repos",
          events_url:
            "https://api.github.com/users/zaidmukaddam/events{/privacy}",
          received_events_url:
            "https://api.github.com/users/zaidmukaddam/received_events",
          type: "User",
          user_view_type: "public",
          site_admin: "false",
        },
      ],
      html_url: "https://github.com/zaidmukaddam/scira/issues/76",
    };
    expect(inProgressFilter(testAssignedIssue)).toBe(true);
  });
});

describe("findDifferentElements", () => {
  const testGitHubIssues: Issue[] = [
    {
      id: "2855418535",
      state: "closed",
      title: "[React 19]",
      body: "## Summary\n\n<!--\n  Please provide a CodeSandbox (https://codesandbox.io/s/new), a link to a\n  repository on GitHub, or provide a minimal code example that reproduces the\n  problem. You may provide a screenshot of the application if you think it is\n  relevant to your bug report. Here are some tips for providing a minimal\n  example: https://stackoverflow.com/help/mcve.\n-->\n",
      assignee: null,
      assignees: [],
      html_url: "https://github.com/facebook/react/issues/32390",
    },
    {
      id: "2856978987",
      state: "closed",
      title: ".env file not being excluded",
      body: "**Steps to reproduce:**\n\n1. The .env file still appears in git status\n2. Changes to .env are still being tracked",
      assignee: null,
      assignees: [],
      html_url: "https://github.com/zaidmukaddam/scira/issues/87",
    },
    {
      id: "2854601509",
      state: "closed",
      title: "fix: update PWA icon configuration and add proper icon files",
      body: null,
      assignee: null,
      assignees: [],
      html_url: "https://github.com/zaidmukaddam/scira/pull/79",
    },
  ];
  const testSameStoredIssues: Issue[] = [
    {
      id: "2855418535",
      state: "closed",
      title: "[React 19]",
      body: "## Summary\n\n<!--\n  Please provide a CodeSandbox (https://codesandbox.io/s/new), a link to a\n  repository on GitHub, or provide a minimal code example that reproduces the\n  problem. You may provide a screenshot of the application if you think it is\n  relevant to your bug report. Here are some tips for providing a minimal\n  example: https://stackoverflow.com/help/mcve.\n-->\n",
      assignee: null,
      assignees: [],
      html_url: "https://github.com/facebook/react/issues/32390",
    },
    {
      id: "2856978987",
      state: "closed",
      title: ".env file not being excluded",
      body: "**Steps to reproduce:**\n\n1. The .env file still appears in git status\n2. Changes to .env are still being tracked",
      assignee: null,
      assignees: [],
      html_url: "https://github.com/zaidmukaddam/scira/issues/87",
    },
    {
      id: "2854601509",
      state: "closed",
      title: "fix: update PWA icon configuration and add proper icon files",
      body: null,
      assignee: null,
      assignees: [],
      html_url: "https://github.com/zaidmukaddam/scira/pull/79",
    },
  ];
  const testStoredIssues: Issue[] = [
    {
      id: "2855418535",
      state: "closed",
      title: "[React 19]",
      body: "## Summary\n\n<!--\n  Please provide a CodeSandbox (https://codesandbox.io/s/new), a link to a\n  repository on GitHub, or provide a minimal code example that reproduces the\n  problem. You may provide a screenshot of the application if you think it is\n  relevant to your bug report. Here are some tips for providing a minimal\n  example: https://stackoverflow.com/help/mcve.\n-->\n",
      assignee: null,
      assignees: [],
      html_url: "https://github.com/facebook/react/issues/32390",
    },
    {
      id: "2856978987",
      state: "closed",
      title: ".env file not being excluded",
      body: "**Steps to reproduce:**\n\n1. The .env file still appears in git status\n2. Changes to .env are still being tracked",
      assignee: null,
      assignees: [],
      html_url: "https://github.com/zaidmukaddam/scira/issues/87",
    },
  ];
  it("should return the elements which are unique to github array", () => {
    expect(findDifferentElements(testStoredIssues, testGitHubIssues)).toEqual([
      {
        id: "2854601509",
        state: "closed",
        title: "fix: update PWA icon configuration and add proper icon files",
        body: null,
        assignee: null,
        assignees: [],
        html_url: "https://github.com/zaidmukaddam/scira/pull/79",
      },
    ]);
  });
  it("should return the elements which are unique to github array", () => {
    expect(findDifferentElements(testSameStoredIssues, testGitHubIssues)).toEqual([]);
  });
});

describe('sortIssues', () => {
  it('should return an object with three keys, values of which are sorted issues by their state (open, inProgress, done)', () => {

    const unsortedIssuesArray: unknown[] = [
      {
        "url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/5",
        "repository_url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer",
        "labels_url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/5/labels{/name}",
        "comments_url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/5/comments",
        "events_url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/5/events",
        "html_url": "https://github.com/sirdachello/GitHub-repo-issues-viewer/issues/5",
        "id": 2859478342,
        "node_id": "I_kwDON52X3c6qcC1G",
        "number": 5,
        "title": "in-process showcase",
        "user": {
          "login": "sirdachello",
          "id": 168132021,
          "node_id": "U_kgDOCgV9tQ",
          "avatar_url": "https://avatars.githubusercontent.com/u/168132021?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/sirdachello",
          "html_url": "https://github.com/sirdachello",
          "followers_url": "https://api.github.com/users/sirdachello/followers",
          "following_url": "https://api.github.com/users/sirdachello/following{/other_user}",
          "gists_url": "https://api.github.com/users/sirdachello/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/sirdachello/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/sirdachello/subscriptions",
          "organizations_url": "https://api.github.com/users/sirdachello/orgs",
          "repos_url": "https://api.github.com/users/sirdachello/repos",
          "events_url": "https://api.github.com/users/sirdachello/events{/privacy}",
          "received_events_url": "https://api.github.com/users/sirdachello/received_events",
          "type": "User",
          "user_view_type": "public",
          "site_admin": false
        },
        "labels": [
    
        ],
        "state": "open",
        "locked": false,
        "assignee": {
          "login": "sirdachello",
          "id": 168132021,
          "node_id": "U_kgDOCgV9tQ",
          "avatar_url": "https://avatars.githubusercontent.com/u/168132021?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/sirdachello",
          "html_url": "https://github.com/sirdachello",
          "followers_url": "https://api.github.com/users/sirdachello/followers",
          "following_url": "https://api.github.com/users/sirdachello/following{/other_user}",
          "gists_url": "https://api.github.com/users/sirdachello/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/sirdachello/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/sirdachello/subscriptions",
          "organizations_url": "https://api.github.com/users/sirdachello/orgs",
          "repos_url": "https://api.github.com/users/sirdachello/repos",
          "events_url": "https://api.github.com/users/sirdachello/events{/privacy}",
          "received_events_url": "https://api.github.com/users/sirdachello/received_events",
          "type": "User",
          "user_view_type": "public",
          "site_admin": false
        },
        "assignees": [
          {
            "login": "sirdachello",
            "id": 168132021,
            "node_id": "U_kgDOCgV9tQ",
            "avatar_url": "https://avatars.githubusercontent.com/u/168132021?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/sirdachello",
            "html_url": "https://github.com/sirdachello",
            "followers_url": "https://api.github.com/users/sirdachello/followers",
            "following_url": "https://api.github.com/users/sirdachello/following{/other_user}",
            "gists_url": "https://api.github.com/users/sirdachello/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/sirdachello/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/sirdachello/subscriptions",
            "organizations_url": "https://api.github.com/users/sirdachello/orgs",
            "repos_url": "https://api.github.com/users/sirdachello/repos",
            "events_url": "https://api.github.com/users/sirdachello/events{/privacy}",
            "received_events_url": "https://api.github.com/users/sirdachello/received_events",
            "type": "User",
            "user_view_type": "public",
            "site_admin": false
          }
        ],
        "milestone": null,
        "comments": 0,
        "created_at": "2025-02-18T06:29:07Z",
        "updated_at": "2025-02-18T06:29:23Z",
        "closed_at": null,
        "author_association": "OWNER",
        "sub_issues_summary": {
          "total": 0,
          "completed": 0,
          "percent_completed": 0
        },
        "active_lock_reason": null,
        "body": "this issues is going to end up in in-process section",
        "closed_by": null,
        "reactions": {
          "url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/5/reactions",
          "total_count": 0,
          "+1": 0,
          "-1": 0,
          "laugh": 0,
          "hooray": 0,
          "confused": 0,
          "heart": 0,
          "rocket": 0,
          "eyes": 0
        },
        "timeline_url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/5/timeline",
        "performed_via_github_app": null,
        "state_reason": null
      },
      {
        "url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/4",
        "repository_url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer",
        "labels_url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/4/labels{/name}",
        "comments_url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/4/comments",
        "events_url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/4/events",
        "html_url": "https://github.com/sirdachello/GitHub-repo-issues-viewer/issues/4",
        "id": 2859456241,
        "node_id": "I_kwDON52X3c6qb9bx",
        "number": 4,
        "title": "Testing storage functionality",
        "user": {
          "login": "sirdachello",
          "id": 168132021,
          "node_id": "U_kgDOCgV9tQ",
          "avatar_url": "https://avatars.githubusercontent.com/u/168132021?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/sirdachello",
          "html_url": "https://github.com/sirdachello",
          "followers_url": "https://api.github.com/users/sirdachello/followers",
          "following_url": "https://api.github.com/users/sirdachello/following{/other_user}",
          "gists_url": "https://api.github.com/users/sirdachello/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/sirdachello/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/sirdachello/subscriptions",
          "organizations_url": "https://api.github.com/users/sirdachello/orgs",
          "repos_url": "https://api.github.com/users/sirdachello/repos",
          "events_url": "https://api.github.com/users/sirdachello/events{/privacy}",
          "received_events_url": "https://api.github.com/users/sirdachello/received_events",
          "type": "User",
          "user_view_type": "public",
          "site_admin": false
        },
        "labels": [
    
        ],
        "state": "open",
        "locked": false,
        "assignee": {
          "login": "sirdachello",
          "id": 168132021,
          "node_id": "U_kgDOCgV9tQ",
          "avatar_url": "https://avatars.githubusercontent.com/u/168132021?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/sirdachello",
          "html_url": "https://github.com/sirdachello",
          "followers_url": "https://api.github.com/users/sirdachello/followers",
          "following_url": "https://api.github.com/users/sirdachello/following{/other_user}",
          "gists_url": "https://api.github.com/users/sirdachello/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/sirdachello/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/sirdachello/subscriptions",
          "organizations_url": "https://api.github.com/users/sirdachello/orgs",
          "repos_url": "https://api.github.com/users/sirdachello/repos",
          "events_url": "https://api.github.com/users/sirdachello/events{/privacy}",
          "received_events_url": "https://api.github.com/users/sirdachello/received_events",
          "type": "User",
          "user_view_type": "public",
          "site_admin": false
        },
        "assignees": [
          {
            "login": "sirdachello",
            "id": 168132021,
            "node_id": "U_kgDOCgV9tQ",
            "avatar_url": "https://avatars.githubusercontent.com/u/168132021?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/sirdachello",
            "html_url": "https://github.com/sirdachello",
            "followers_url": "https://api.github.com/users/sirdachello/followers",
            "following_url": "https://api.github.com/users/sirdachello/following{/other_user}",
            "gists_url": "https://api.github.com/users/sirdachello/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/sirdachello/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/sirdachello/subscriptions",
            "organizations_url": "https://api.github.com/users/sirdachello/orgs",
            "repos_url": "https://api.github.com/users/sirdachello/repos",
            "events_url": "https://api.github.com/users/sirdachello/events{/privacy}",
            "received_events_url": "https://api.github.com/users/sirdachello/received_events",
            "type": "User",
            "user_view_type": "public",
            "site_admin": false
          }
        ],
        "milestone": null,
        "comments": 0,
        "created_at": "2025-02-18T06:13:57Z",
        "updated_at": "2025-02-18T06:15:30Z",
        "closed_at": null,
        "author_association": "OWNER",
        "sub_issues_summary": {
          "total": 0,
          "completed": 0,
          "percent_completed": 0
        },
        "active_lock_reason": null,
        "body": "Please work :)",
        "closed_by": null,
        "reactions": {
          "url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/4/reactions",
          "total_count": 0,
          "+1": 0,
          "-1": 0,
          "laugh": 0,
          "hooray": 0,
          "confused": 0,
          "heart": 0,
          "rocket": 0,
          "eyes": 0
        },
        "timeline_url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/4/timeline",
        "performed_via_github_app": null,
        "state_reason": null
      },
      {
        "url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/3",
        "repository_url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer",
        "labels_url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/3/labels{/name}",
        "comments_url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/3/comments",
        "events_url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/3/events",
        "html_url": "https://github.com/sirdachello/GitHub-repo-issues-viewer/issues/3",
        "id": 2855401346,
        "node_id": "I_kwDON52X3c6qMfeC",
        "number": 3,
        "title": "brand-new-issue",
        "user": {
          "login": "sirdachello",
          "id": 168132021,
          "node_id": "U_kgDOCgV9tQ",
          "avatar_url": "https://avatars.githubusercontent.com/u/168132021?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/sirdachello",
          "html_url": "https://github.com/sirdachello",
          "followers_url": "https://api.github.com/users/sirdachello/followers",
          "following_url": "https://api.github.com/users/sirdachello/following{/other_user}",
          "gists_url": "https://api.github.com/users/sirdachello/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/sirdachello/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/sirdachello/subscriptions",
          "organizations_url": "https://api.github.com/users/sirdachello/orgs",
          "repos_url": "https://api.github.com/users/sirdachello/repos",
          "events_url": "https://api.github.com/users/sirdachello/events{/privacy}",
          "received_events_url": "https://api.github.com/users/sirdachello/received_events",
          "type": "User",
          "user_view_type": "public",
          "site_admin": false
        },
        "labels": [
    
        ],
        "state": "open",
        "locked": false,
        "assignee": null,
        "assignees": [
    
        ],
        "milestone": null,
        "comments": 0,
        "created_at": "2025-02-15T10:50:44Z",
        "updated_at": "2025-02-15T10:50:44Z",
        "closed_at": null,
        "author_association": "OWNER",
        "sub_issues_summary": {
          "total": 0,
          "completed": 0,
          "percent_completed": 0
        },
        "active_lock_reason": null,
        "body": "Dummy text for a brand new issue",
        "closed_by": null,
        "reactions": {
          "url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/3/reactions",
          "total_count": 0,
          "+1": 0,
          "-1": 0,
          "laugh": 0,
          "hooray": 0,
          "confused": 0,
          "heart": 0,
          "rocket": 0,
          "eyes": 0
        },
        "timeline_url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/3/timeline",
        "performed_via_github_app": null,
        "state_reason": null
      },
      {
        "url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/2",
        "repository_url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer",
        "labels_url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/2/labels{/name}",
        "comments_url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/2/comments",
        "events_url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/2/events",
        "html_url": "https://github.com/sirdachello/GitHub-repo-issues-viewer/issues/2",
        "id": 2855401024,
        "node_id": "I_kwDON52X3c6qMfZA",
        "number": 2,
        "title": "issue-in-progress",
        "user": {
          "login": "sirdachello",
          "id": 168132021,
          "node_id": "U_kgDOCgV9tQ",
          "avatar_url": "https://avatars.githubusercontent.com/u/168132021?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/sirdachello",
          "html_url": "https://github.com/sirdachello",
          "followers_url": "https://api.github.com/users/sirdachello/followers",
          "following_url": "https://api.github.com/users/sirdachello/following{/other_user}",
          "gists_url": "https://api.github.com/users/sirdachello/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/sirdachello/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/sirdachello/subscriptions",
          "organizations_url": "https://api.github.com/users/sirdachello/orgs",
          "repos_url": "https://api.github.com/users/sirdachello/repos",
          "events_url": "https://api.github.com/users/sirdachello/events{/privacy}",
          "received_events_url": "https://api.github.com/users/sirdachello/received_events",
          "type": "User",
          "user_view_type": "public",
          "site_admin": false
        },
        "labels": [
    
        ],
        "state": "open",
        "locked": false,
        "assignee": {
          "login": "sirdachello",
          "id": 168132021,
          "node_id": "U_kgDOCgV9tQ",
          "avatar_url": "https://avatars.githubusercontent.com/u/168132021?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/sirdachello",
          "html_url": "https://github.com/sirdachello",
          "followers_url": "https://api.github.com/users/sirdachello/followers",
          "following_url": "https://api.github.com/users/sirdachello/following{/other_user}",
          "gists_url": "https://api.github.com/users/sirdachello/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/sirdachello/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/sirdachello/subscriptions",
          "organizations_url": "https://api.github.com/users/sirdachello/orgs",
          "repos_url": "https://api.github.com/users/sirdachello/repos",
          "events_url": "https://api.github.com/users/sirdachello/events{/privacy}",
          "received_events_url": "https://api.github.com/users/sirdachello/received_events",
          "type": "User",
          "user_view_type": "public",
          "site_admin": false
        },
        "assignees": [
          {
            "login": "sirdachello",
            "id": 168132021,
            "node_id": "U_kgDOCgV9tQ",
            "avatar_url": "https://avatars.githubusercontent.com/u/168132021?v=4",
            "gravatar_id": "",
            "url": "https://api.github.com/users/sirdachello",
            "html_url": "https://github.com/sirdachello",
            "followers_url": "https://api.github.com/users/sirdachello/followers",
            "following_url": "https://api.github.com/users/sirdachello/following{/other_user}",
            "gists_url": "https://api.github.com/users/sirdachello/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/sirdachello/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/sirdachello/subscriptions",
            "organizations_url": "https://api.github.com/users/sirdachello/orgs",
            "repos_url": "https://api.github.com/users/sirdachello/repos",
            "events_url": "https://api.github.com/users/sirdachello/events{/privacy}",
            "received_events_url": "https://api.github.com/users/sirdachello/received_events",
            "type": "User",
            "user_view_type": "public",
            "site_admin": false
          }
        ],
        "milestone": null,
        "comments": 0,
        "created_at": "2025-02-15T10:50:01Z",
        "updated_at": "2025-02-15T10:50:21Z",
        "closed_at": null,
        "author_association": "OWNER",
        "sub_issues_summary": {
          "total": 0,
          "completed": 0,
          "percent_completed": 0
        },
        "active_lock_reason": null,
        "body": "Lorem Ipusm...",
        "closed_by": null,
        "reactions": {
          "url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/2/reactions",
          "total_count": 0,
          "+1": 0,
          "-1": 0,
          "laugh": 0,
          "hooray": 0,
          "confused": 0,
          "heart": 0,
          "rocket": 0,
          "eyes": 0
        },
        "timeline_url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/2/timeline",
        "performed_via_github_app": null,
        "state_reason": null
      },
      {
        "url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/1",
        "repository_url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer",
        "labels_url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/1/labels{/name}",
        "comments_url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/1/comments",
        "events_url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/1/events",
        "html_url": "https://github.com/sirdachello/GitHub-repo-issues-viewer/issues/1",
        "id": 2855327372,
        "node_id": "I_kwDON52X3c6qMNaM",
        "number": 1,
        "title": "Test-issue",
        "user": {
          "login": "sirdachello",
          "id": 168132021,
          "node_id": "U_kgDOCgV9tQ",
          "avatar_url": "https://avatars.githubusercontent.com/u/168132021?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/sirdachello",
          "html_url": "https://github.com/sirdachello",
          "followers_url": "https://api.github.com/users/sirdachello/followers",
          "following_url": "https://api.github.com/users/sirdachello/following{/other_user}",
          "gists_url": "https://api.github.com/users/sirdachello/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/sirdachello/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/sirdachello/subscriptions",
          "organizations_url": "https://api.github.com/users/sirdachello/orgs",
          "repos_url": "https://api.github.com/users/sirdachello/repos",
          "events_url": "https://api.github.com/users/sirdachello/events{/privacy}",
          "received_events_url": "https://api.github.com/users/sirdachello/received_events",
          "type": "User",
          "user_view_type": "public",
          "site_admin": false
        },
        "labels": [
    
        ],
        "state": "closed",
        "locked": false,
        "assignee": null,
        "assignees": [
    
        ],
        "milestone": null,
        "comments": 0,
        "created_at": "2025-02-15T08:20:21Z",
        "updated_at": "2025-02-15T10:49:35Z",
        "closed_at": "2025-02-15T10:49:35Z",
        "author_association": "OWNER",
        "sub_issues_summary": {
          "total": 0,
          "completed": 0,
          "percent_completed": 0
        },
        "active_lock_reason": null,
        "body": "Lorem.",
        "closed_by": {
          "login": "sirdachello",
          "id": 168132021,
          "node_id": "U_kgDOCgV9tQ",
          "avatar_url": "https://avatars.githubusercontent.com/u/168132021?v=4",
          "gravatar_id": "",
          "url": "https://api.github.com/users/sirdachello",
          "html_url": "https://github.com/sirdachello",
          "followers_url": "https://api.github.com/users/sirdachello/followers",
          "following_url": "https://api.github.com/users/sirdachello/following{/other_user}",
          "gists_url": "https://api.github.com/users/sirdachello/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/sirdachello/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/sirdachello/subscriptions",
          "organizations_url": "https://api.github.com/users/sirdachello/orgs",
          "repos_url": "https://api.github.com/users/sirdachello/repos",
          "events_url": "https://api.github.com/users/sirdachello/events{/privacy}",
          "received_events_url": "https://api.github.com/users/sirdachello/received_events",
          "type": "User",
          "user_view_type": "public",
          "site_admin": false
        },
        "reactions": {
          "url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/1/reactions",
          "total_count": 0,
          "+1": 0,
          "-1": 0,
          "laugh": 0,
          "hooray": 0,
          "confused": 0,
          "heart": 0,
          "rocket": 0,
          "eyes": 0
        },
        "timeline_url": "https://api.github.com/repos/sirdachello/GitHub-repo-issues-viewer/issues/1/timeline",
        "performed_via_github_app": null,
        "state_reason": "completed"
      }
]
    const sortedIssuesObject: {
    toDoArray: Issue[];
    inProgressArray: Issue[];
    doneArray: Issue[];
  } = {
      "toDoArray": [
          {
              "id": 2855401346,
              "state": "open",
              "title": "brand-new-issue",
              "body": "Dummy text for a brand new issue",
              "assignee": null,
              "assignees": [],
              "html_url": "https://github.com/sirdachello/GitHub-repo-issues-viewer/issues/3"
          }
      ],
      "inProgressArray": [
          {
              "id": 2859478342,
              "state": "open",
              "title": "in-process showcase",
              "body": "this issues is going to end up in in-process section",
              "assignee": {
                  "login": "sirdachello",
                  "id": 168132021,
                  "node_id": "U_kgDOCgV9tQ",
                  "avatar_url": "https://avatars.githubusercontent.com/u/168132021?v=4",
                  "gravatar_id": "",
                  "url": "https://api.github.com/users/sirdachello",
                  "html_url": "https://github.com/sirdachello",
                  "followers_url": "https://api.github.com/users/sirdachello/followers",
                  "following_url": "https://api.github.com/users/sirdachello/following{/other_user}",
                  "gists_url": "https://api.github.com/users/sirdachello/gists{/gist_id}",
                  "starred_url": "https://api.github.com/users/sirdachello/starred{/owner}{/repo}",
                  "subscriptions_url": "https://api.github.com/users/sirdachello/subscriptions",
                  "organizations_url": "https://api.github.com/users/sirdachello/orgs",
                  "repos_url": "https://api.github.com/users/sirdachello/repos",
                  "events_url": "https://api.github.com/users/sirdachello/events{/privacy}",
                  "received_events_url": "https://api.github.com/users/sirdachello/received_events",
                  "type": "User",
                  "user_view_type": "public",
                  "site_admin": false
              },
              "assignees": [
                  {
                      "login": "sirdachello",
                      "id": 168132021,
                      "node_id": "U_kgDOCgV9tQ",
                      "avatar_url": "https://avatars.githubusercontent.com/u/168132021?v=4",
                      "gravatar_id": "",
                      "url": "https://api.github.com/users/sirdachello",
                      "html_url": "https://github.com/sirdachello",
                      "followers_url": "https://api.github.com/users/sirdachello/followers",
                      "following_url": "https://api.github.com/users/sirdachello/following{/other_user}",
                      "gists_url": "https://api.github.com/users/sirdachello/gists{/gist_id}",
                      "starred_url": "https://api.github.com/users/sirdachello/starred{/owner}{/repo}",
                      "subscriptions_url": "https://api.github.com/users/sirdachello/subscriptions",
                      "organizations_url": "https://api.github.com/users/sirdachello/orgs",
                      "repos_url": "https://api.github.com/users/sirdachello/repos",
                      "events_url": "https://api.github.com/users/sirdachello/events{/privacy}",
                      "received_events_url": "https://api.github.com/users/sirdachello/received_events",
                      "type": "User",
                      "user_view_type": "public",
                      "site_admin": false
                  }
              ],
              "html_url": "https://github.com/sirdachello/GitHub-repo-issues-viewer/issues/5"
          },
          {
              "id": 2859456241,
              "state": "open",
              "title": "Testing storage functionality",
              "body": "Please work :)",
              "assignee": {
                  "login": "sirdachello",
                  "id": 168132021,
                  "node_id": "U_kgDOCgV9tQ",
                  "avatar_url": "https://avatars.githubusercontent.com/u/168132021?v=4",
                  "gravatar_id": "",
                  "url": "https://api.github.com/users/sirdachello",
                  "html_url": "https://github.com/sirdachello",
                  "followers_url": "https://api.github.com/users/sirdachello/followers",
                  "following_url": "https://api.github.com/users/sirdachello/following{/other_user}",
                  "gists_url": "https://api.github.com/users/sirdachello/gists{/gist_id}",
                  "starred_url": "https://api.github.com/users/sirdachello/starred{/owner}{/repo}",
                  "subscriptions_url": "https://api.github.com/users/sirdachello/subscriptions",
                  "organizations_url": "https://api.github.com/users/sirdachello/orgs",
                  "repos_url": "https://api.github.com/users/sirdachello/repos",
                  "events_url": "https://api.github.com/users/sirdachello/events{/privacy}",
                  "received_events_url": "https://api.github.com/users/sirdachello/received_events",
                  "type": "User",
                  "user_view_type": "public",
                  "site_admin": false
              },
              "assignees": [
                  {
                      "login": "sirdachello",
                      "id": 168132021,
                      "node_id": "U_kgDOCgV9tQ",
                      "avatar_url": "https://avatars.githubusercontent.com/u/168132021?v=4",
                      "gravatar_id": "",
                      "url": "https://api.github.com/users/sirdachello",
                      "html_url": "https://github.com/sirdachello",
                      "followers_url": "https://api.github.com/users/sirdachello/followers",
                      "following_url": "https://api.github.com/users/sirdachello/following{/other_user}",
                      "gists_url": "https://api.github.com/users/sirdachello/gists{/gist_id}",
                      "starred_url": "https://api.github.com/users/sirdachello/starred{/owner}{/repo}",
                      "subscriptions_url": "https://api.github.com/users/sirdachello/subscriptions",
                      "organizations_url": "https://api.github.com/users/sirdachello/orgs",
                      "repos_url": "https://api.github.com/users/sirdachello/repos",
                      "events_url": "https://api.github.com/users/sirdachello/events{/privacy}",
                      "received_events_url": "https://api.github.com/users/sirdachello/received_events",
                      "type": "User",
                      "user_view_type": "public",
                      "site_admin": false
                  }
              ],
              "html_url": "https://github.com/sirdachello/GitHub-repo-issues-viewer/issues/4"
          },
          {
              "id": 2855401024,
              "state": "open",
              "title": "issue-in-progress",
              "body": "Lorem Ipusm...",
              "assignee": {
                  "login": "sirdachello",
                  "id": 168132021,
                  "node_id": "U_kgDOCgV9tQ",
                  "avatar_url": "https://avatars.githubusercontent.com/u/168132021?v=4",
                  "gravatar_id": "",
                  "url": "https://api.github.com/users/sirdachello",
                  "html_url": "https://github.com/sirdachello",
                  "followers_url": "https://api.github.com/users/sirdachello/followers",
                  "following_url": "https://api.github.com/users/sirdachello/following{/other_user}",
                  "gists_url": "https://api.github.com/users/sirdachello/gists{/gist_id}",
                  "starred_url": "https://api.github.com/users/sirdachello/starred{/owner}{/repo}",
                  "subscriptions_url": "https://api.github.com/users/sirdachello/subscriptions",
                  "organizations_url": "https://api.github.com/users/sirdachello/orgs",
                  "repos_url": "https://api.github.com/users/sirdachello/repos",
                  "events_url": "https://api.github.com/users/sirdachello/events{/privacy}",
                  "received_events_url": "https://api.github.com/users/sirdachello/received_events",
                  "type": "User",
                  "user_view_type": "public",
                  "site_admin": false
              },
              "assignees": [
                  {
                      "login": "sirdachello",
                      "id": 168132021,
                      "node_id": "U_kgDOCgV9tQ",
                      "avatar_url": "https://avatars.githubusercontent.com/u/168132021?v=4",
                      "gravatar_id": "",
                      "url": "https://api.github.com/users/sirdachello",
                      "html_url": "https://github.com/sirdachello",
                      "followers_url": "https://api.github.com/users/sirdachello/followers",
                      "following_url": "https://api.github.com/users/sirdachello/following{/other_user}",
                      "gists_url": "https://api.github.com/users/sirdachello/gists{/gist_id}",
                      "starred_url": "https://api.github.com/users/sirdachello/starred{/owner}{/repo}",
                      "subscriptions_url": "https://api.github.com/users/sirdachello/subscriptions",
                      "organizations_url": "https://api.github.com/users/sirdachello/orgs",
                      "repos_url": "https://api.github.com/users/sirdachello/repos",
                      "events_url": "https://api.github.com/users/sirdachello/events{/privacy}",
                      "received_events_url": "https://api.github.com/users/sirdachello/received_events",
                      "type": "User",
                      "user_view_type": "public",
                      "site_admin": false
                  }
              ],
              "html_url": "https://github.com/sirdachello/GitHub-repo-issues-viewer/issues/2"
          }
      ],
      "doneArray": [
          {
              "id": 2855327372,
              "state": "closed",
              "title": "Test-issue",
              "body": "Lorem.",
              "assignee": null,
              "assignees": [],
              "html_url": "https://github.com/sirdachello/GitHub-repo-issues-viewer/issues/1"
          }
      ]
  }
    expect(sortIssues(unsortedIssuesArray as Issue[])).toEqual(sortedIssuesObject)
  })
})