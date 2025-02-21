import { useGitHubData } from "@/hooks/useGitHubData";
import { useStore } from "@/store/useStore";
import { act, renderHook } from "@testing-library/react";
import { vi } from "vitest";

vi.mock("@/store/useStore", () => ({
  useStore: vi.fn(() => ({
    setData: vi.fn(),
    setErrorMessage: vi.fn(),
    setActiveRepo: vi.fn(),
    setLoading: vi.fn(),
  })),
}));

describe('useGitHubData', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  test('should render the something', () => {
    const { result } = renderHook(useGitHubData);
    const loadData = result.current.loadData;
  
    expect(typeof loadData).toBe('function')
  });
  test('should call setErrorMessage with instructions for valid repo name, if given non-link text', async ()  => {
    const { result } = renderHook(useGitHubData);
    const loadData = result.current.loadData;

    await act(async () => {
      await loadData("anythingotherthanvalidurl");
    });

    const storeMock = (useStore as any).mock.results[0].value;

    expect(storeMock.setErrorMessage).toHaveBeenCalledWith(
      'Please, enter a valid repository link. Format: "https://github.com/owner/repository-name"'
    );
  })
  test('should call setErrorMessage with with an error, if link leads to a non-existent repo', async ()  => {
    const { result } = renderHook(useGitHubData);
    const loadData = result.current.loadData;

    await act(async () => {
      await loadData("https://github.com/non-existent-user/non-existent-repo");
    });

    const storeMock = (useStore as any).mock.results[0].value;

    expect(storeMock.setErrorMessage).toHaveBeenCalledWith("Repository not found!");
  })
  test('should set active repo owner and repo name', async ()  => {
    const { result } = renderHook(useGitHubData);
    const loadData = result.current.loadData;

    await act(async () => {
      await loadData("https://github.com/facebook/react");
    });

    const storeMock = (useStore as any).mock.results[0].value;

    expect(storeMock.setActiveRepo).toHaveBeenCalledWith(['facebook', 'react']);
  })
})