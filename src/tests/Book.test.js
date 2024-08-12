import {test, expect, beforeEach} from '@jest/globals';
import {render, screen, act} from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import Book from "../components/Book";

const book = {
  author_name: ["F. Scott Fitzgerald"],
  publish_date: [
    "Oct 27, 2020",
    "1996 January 01",
    "1934",
    "2019",
    "Sep 01, 2018",
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
};

beforeEach(() => {
  fetchMock.resetMocks()
})

test('renders Book component', async () => {
  // ACT
  await act(() => {
    render(<Book {...book} />);
  });

  // ASSERT
  expect(screen.getByRole('heading')).toHaveTextContent(book.title);
  expect(await screen.findByText(`Author: ${book.author_name[0]}`)).toBeInTheDocument();
  expect(await screen.findByText(`Publish Date: ${book.publish_date?.[0]}`)).toBeInTheDocument();
})
