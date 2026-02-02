<?php

declare(strict_types=1);

namespace OCA\WorkTime\Controller;

use OCA\WorkTime\AppInfo\Application;
use OCA\WorkTime\Service\ForbiddenException;
use OCA\WorkTime\Service\NotFoundException;
use OCA\WorkTime\Service\ValidationException;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\OCSController;
use OCP\IRequest;

/**
 * Base controller with common functionality for all WorkTime controllers.
 *
 * Provides:
 * - Unified authentication checks
 * - Centralized exception handling
 */
abstract class BaseController extends OCSController {

    protected ?string $userId;

    public function __construct(
        IRequest $request,
        ?string $userId,
    ) {
        parent::__construct(Application::APP_ID, $request);
        $this->userId = $userId;
    }

    /**
     * Check if user is authenticated and return error response if not.
     *
     * @return JSONResponse|null Returns error response if not authenticated, null otherwise
     */
    protected function requireAuth(): ?JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }
        return null;
    }

    /**
     * Handle exceptions and convert them to appropriate JSON responses.
     *
     * @param \Exception $e The exception to handle
     * @param string $context Optional context for logging
     * @return JSONResponse The appropriate error response
     */
    protected function handleException(\Exception $e, string $context = ''): JSONResponse {
        if ($e instanceof NotFoundException) {
            return new JSONResponse(
                ['error' => $e->getMessage()],
                Http::STATUS_NOT_FOUND
            );
        }

        if ($e instanceof ForbiddenException) {
            return new JSONResponse(
                ['error' => $e->getMessage()],
                Http::STATUS_FORBIDDEN
            );
        }

        if ($e instanceof ValidationException) {
            return new JSONResponse(
                ['error' => $e->getMessage(), 'errors' => $e->getErrors()],
                Http::STATUS_BAD_REQUEST
            );
        }

        // For exceptions with meaningful messages (like validation errors), return the message
        // Otherwise return a generic error
        $message = $e->getMessage();
        if (!empty($message) && !str_contains($message, 'SQLSTATE')) {
            return new JSONResponse(
                ['error' => $message],
                Http::STATUS_BAD_REQUEST
            );
        }

        // Generic error response for unexpected exceptions (database errors, etc.)
        return new JSONResponse(
            ['error' => 'An unexpected error occurred'],
            Http::STATUS_INTERNAL_SERVER_ERROR
        );
    }

    /**
     * Create a forbidden response.
     *
     * @param string $message Optional custom message
     * @return JSONResponse
     */
    protected function forbiddenResponse(string $message = 'Access denied'): JSONResponse {
        return new JSONResponse(['error' => $message], Http::STATUS_FORBIDDEN);
    }

    /**
     * Create a success response with data.
     *
     * @param mixed $data The data to return
     * @param int $status HTTP status code (default: 200)
     * @return JSONResponse
     */
    protected function successResponse(mixed $data, int $status = Http::STATUS_OK): JSONResponse {
        return new JSONResponse($data, $status);
    }

    /**
     * Create a created response.
     *
     * @param mixed $data The created entity
     * @return JSONResponse
     */
    protected function createdResponse(mixed $data): JSONResponse {
        return new JSONResponse($data, Http::STATUS_CREATED);
    }

    /**
     * Create a deleted response.
     *
     * @return JSONResponse
     */
    protected function deletedResponse(): JSONResponse {
        return new JSONResponse(['status' => 'deleted']);
    }
}
