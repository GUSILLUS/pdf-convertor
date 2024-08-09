import { render, screen } from '@testing-library/react';
import { PDFViewer } from 'features/pdf-viewer';

const intersectionObserverMock = () => ({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
})
window.IntersectionObserver = jest.fn().mockImplementation(intersectionObserverMock);

describe('PDFViewer', () => {
  test('renders without crashing', () => {
    render(<PDFViewer fileUrl={null} />);
    expect(screen.getByText('PDF Viewer')).toBeInTheDocument();
  });

  test('renders PDF viewer when fileUrl is provided', () => {
    render(<PDFViewer fileUrl="sample.pdf" />);
    expect(screen.getByText('PDF Viewer')).toBeInTheDocument();
    expect(screen.getByTestId('core__viewer')).toBeInTheDocument();
  });

  test('does not render PDF viewer when fileUrl is null', () => {
    render(<PDFViewer fileUrl={null} />);
    expect(screen.getByText('PDF Viewer')).toBeInTheDocument();
    expect(screen.queryByTestId('core__viewer')).not.toBeInTheDocument();
  });
});