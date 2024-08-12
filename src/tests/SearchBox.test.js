import { jest, test, expect, beforeEach } from "@jest/globals";
import { render, screen, act } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import fetchMock from "jest-fetch-mock";
import SearchBox from "../components/SearchBox";

const data = {
  numFound: 1019,
  start: 0,
  numFoundExact: true,
  docs: [
    {
      author_name: ["F. Scott Fitzgerald"],
      key: "/works/OL468431W",
      publish_date: [
        "Oct 27, 2020",
        "1996 January 01",
        "1934",
        "2019",
        "Sep 01, 2018",
        "Jan 06, 2018",
      ],
      title: "The Great Gatsby",
      editions: {
        numFound: 1174,
        start: 0,
        numFoundExact: true,
        docs: [
          {
            key: "/books/OL35657482M",
            title: "The Great Gatsby",
            publish_date: ["2021-01-17"],
          },
        ],
      },
    },
  ],
  num_found: 1019,
  q: "the great gatsby",
  offset: null,
};

beforeEach(() => {
  fetchMock.resetMocks();
});

test("renders SearchBox component", async () => {
  // ACT
  await act(() => {
    render(<SearchBox />);
  });

  // ASSERT
  expect(await screen.findByLabelText("Keyword:")).toBeInTheDocument();
  expect(fetchMock).not.toHaveBeenCalled();
  // expect(await screen.findByText(`Author: ${book.author_name[0]}`)).toBeInTheDocument();
  // expect(await screen.findByText(`Publish Date: ${book.publish_date?.[0]}`)).toBeInTheDocument();
});

test('should show error with failed API', async () => {
  // ARRANGE
  const user = userEvent.setup();
  const keyword = 'The Great';
  fetchMock.mockReject(() => Promise.reject(`Failed to search book by keyword: ${keyword}`))

  // ACT
  await act(() => {
    render(<SearchBox />);
  });

  const searchField = screen.getByPlaceholderText('The great gatsby');
  await user.type(searchField, 'Shadow');

  expect(searchField).toHaveValue('Shadow');

});
