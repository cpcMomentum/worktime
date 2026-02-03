/**
 * Composable for async data loading with loading state and error handling.
 *
 * Provides a standardized way to load data with loading indicators,
 * error handling, and optional success/error notifications.
 */

import { ref } from 'vue'
import { handleError, showSuccessMessage } from '../utils/errorHandler.js'

/**
 * Create a data loader composable.
 *
 * @param {Function} loadFn - The async function to call for loading data
 * @param {Object} options - Configuration options
 * @param {boolean} options.showErrors - Whether to show error notifications (default: true)
 * @param {string} options.errorMessage - Custom error message (default: 'Ein Fehler ist aufgetreten')
 * @returns {Object} Data loader state and methods
 */
export function useDataLoader(loadFn, options = {}) {
    const {
        showErrors = true,
        errorMessage = 'Ein Fehler ist aufgetreten',
    } = options

    // Reactive state
    const loading = ref(false)
    const error = ref(null)
    const data = ref(null)

    /**
     * Load data using the provided function.
     *
     * @param {...any} args - Arguments to pass to the load function
     * @returns {Promise<any>} The loaded data or null on error
     */
    async function load(...args) {
        loading.value = true
        error.value = null

        try {
            const result = await loadFn(...args)
            data.value = result
            return result
        } catch (e) {
            error.value = e
            if (showErrors) {
                handleError(e, errorMessage)
            }
            return null
        } finally {
            loading.value = false
        }
    }

    /**
     * Reset the loader state.
     */
    function reset() {
        loading.value = false
        error.value = null
        data.value = null
    }

    return {
        // State
        loading,
        error,
        data,

        // Methods
        load,
        reset,
    }
}

/**
 * Create an action handler composable for form submissions and mutations.
 *
 * Similar to useDataLoader but designed for actions that modify data
 * rather than just fetching it.
 *
 * @param {Function} actionFn - The async action function
 * @param {Object} options - Configuration options
 * @param {boolean} options.showSuccess - Whether to show success notification (default: false)
 * @param {string} options.successMessage - Success message to show
 * @param {boolean} options.showErrors - Whether to show error notifications (default: true)
 * @param {string} options.errorMessage - Custom error message
 * @returns {Object} Action handler state and methods
 */
export function useActionHandler(actionFn, options = {}) {
    const {
        showSuccess = false,
        successMessage = 'Aktion erfolgreich',
        showErrors = true,
        errorMessage = 'Ein Fehler ist aufgetreten',
    } = options

    // Reactive state
    const processing = ref(false)
    const error = ref(null)

    /**
     * Execute the action.
     *
     * @param {...any} args - Arguments to pass to the action function
     * @returns {Promise<{success: boolean, data?: any, error?: Error}>}
     */
    async function execute(...args) {
        processing.value = true
        error.value = null

        try {
            const result = await actionFn(...args)
            if (showSuccess) {
                showSuccessMessage(successMessage)
            }
            return { success: true, data: result }
        } catch (e) {
            error.value = e
            if (showErrors) {
                handleError(e, errorMessage)
            }
            return { success: false, error: e }
        } finally {
            processing.value = false
        }
    }

    /**
     * Reset the handler state.
     */
    function reset() {
        processing.value = false
        error.value = null
    }

    return {
        // State
        processing,
        error,

        // Methods
        execute,
        reset,
    }
}

export default {
    useDataLoader,
    useActionHandler,
}
