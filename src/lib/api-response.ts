export function successResponse(data: any, message = 'Success') {
  return Response.json({ success: true, message, data }, { status: 200 });
}

export function errorResponse(message: string, status = 400) {
  return Response.json({ success: false, message }, { status });
}