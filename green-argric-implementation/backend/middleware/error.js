export function notFound(req, res) {
  res.status(404).json({ message: `Không tìm thấy ${req.method} ${req.originalUrl}` });
}

export function errorHandler(error, req, res, next) {
  console.error(error);
  res.status(error.status || 500).json({ message: error.message || 'Lỗi máy chủ nội bộ' });
}
