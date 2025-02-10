import { act } from "react"; 
import useData from "../../game-hub/src/hooks/useData";
import { renderHook, waitFor } from "@testing-library/react";
import apiClient from "../../game-hub/src/services/api-client";

jest.mock("../../game-hub/src/services/api-client", () => ({
    get: jest.fn(),
  }));
const mockedApiClient = apiClient as jest.Mocked<typeof apiClient>;

describe("useData Hook API Tests", () => {
    const mockEndpoint = "/games";

    beforeEach(() => {
      jest.clearAllMocks();
    });

    // ✅ Test 1: Successfully fetches data
    it("should receive data successfully", async () => {
        mockedApiClient.get.mockResolvedValueOnce({
          data: { results: [{ id: 1, name: "Test Game" }] }
        });

        const { result } = renderHook(() => useData(mockEndpoint));

        await waitFor(() => {
          expect(result.current.data).not.toEqual([]);
        });
    });

    // ✅ Test 2: Handles API timeout
    it("should handle API timeout errors", async () => {
        mockedApiClient.get.mockRejectedValue(new Error("Timeout Error"));

        const { result } = renderHook(() => useData(mockEndpoint));
        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(result.current.error).toBe("Timeout Error");
    });

    // ✅ Test 3: Handles 404 Not Found
    it("should handle 404 Not Found errors", async () => {
      mockedApiClient.get.mockRejectedValue({ response: { status: 404, data: { message: "Not Found" } } });

      const { result } = renderHook(() => useData(mockEndpoint));
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.error).toBe("Not Found");
    });

    // ✅ Test 4: Handles 500 Internal Server Error
    it("should handle 500 Internal Server Error", async () => {
      mockedApiClient.get.mockRejectedValue({ response: { status: 500, data: { message: "Server Error" } } });

      const { result } = renderHook(() => useData(mockEndpoint));
      await waitFor(() => expect(result.current.isLoading).toBe(false));

      expect(result.current.error).toBe("Server Error");
    });

//   // ✅ Test 5: Handles 401 Unauthorized
//   it("should handle 401 Unauthorized errors", async () => {
//     mockedApiClient.get.mockRejectedValue({ response: { status: 401, data: { message: "Unauthorized" } } });

//     const { result } = renderHook(() => useData(mockEndpoint));
//     await waitFor(() => expect(result.current.isLoading).toBe(false));

//     expect(result.current.error).toBe("Unauthorized");
//   });

//   // ✅ Test 6: Handles 429 Rate Limiting (without retries)
//   it("should handle 429 Too Many Requests errors", async () => {
//     mockedApiClient.get.mockRejectedValue({ response: { status: 429, data: { message: "Rate Limited" } } });

//     const { result } = renderHook(() => useData(mockEndpoint));
//     await waitFor(() => expect(result.current.isLoading).toBe(false));

//     expect(result.current.error).toBe("Rate Limited");
//   });

//   // ✅ Test 7: Handles Canceled Requests (Unmounting)
//   it("should prevent state updates if request is canceled", async () => {
//     const cancelError = new CanceledError("Request canceled");
//     mockedApiClient.get.mockRejectedValue(cancelError);

//     const { result, unmount } = renderHook(() => useData(mockEndpoint));
//     unmount();

//     expect(result.current.data).toEqual([]);
//   });

//   // ✅ Test 8: Handles Empty API Response
//   it("should return an empty array when API response is empty", async () => {
//     const mockResponse = { count: 0, results: [] };
//     mockedApiClient.get.mockResolvedValue({ data: mockResponse });

//     const { result } = renderHook(() => useData(mockEndpoint));
//     await waitFor(() => expect(result.current.isLoading).toBe(false));

//     expect(result.current.data).toEqual([]);
//   });

//   // ✅ Test 9: Handles Dependency Changes
//   it("should re-fetch data when dependencies change", async () => {
//     const initialResponse = { count: 1, results: [{ id: 1, name: "Game One" }] };
//     const updatedResponse = { count: 1, results: [{ id: 2, name: "Game Two" }] };

//     mockedApiClient.get.mockResolvedValueOnce({ data: initialResponse });
//     const { result, rerender } = renderHook(({ endpoint }) => useData(endpoint), {
//       initialProps: { endpoint: mockEndpoint },
//     });

//     await waitFor(() => expect(result.current.isLoading).toBe(false));
//     expect(result.current.data).toEqual(initialResponse.results);

//     mockedApiClient.get.mockResolvedValueOnce({ data: updatedResponse });
//     rerender({ endpoint: "/new-games" });

//     await waitFor(() => expect(result.current.isLoading).toBe(false));
//     expect(result.current.data).toEqual(updatedResponse.results);
//   });

//   // ✅ Test 10: Handles Network Errors
//   it("should return a general network error message when no response exists", async () => {
//     mockedApiClient.get.mockRejectedValue(new Error("Network Error"));

//     const { result } = renderHook(() => useData(mockEndpoint));
//     await waitFor(() => expect(result.current.isLoading).toBe(false));

//     expect(result.current.error).toBe("Network Error");
//   });
});
