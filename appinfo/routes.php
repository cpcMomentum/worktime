<?php

declare(strict_types=1);

return [
    'routes' => [
        // Page routes
        ['name' => 'page#index', 'url' => '/', 'verb' => 'GET'],

        // Time Entries API
        ['name' => 'time_entry#index', 'url' => '/api/time-entries', 'verb' => 'GET'],
        ['name' => 'time_entry#show', 'url' => '/api/time-entries/{id}', 'verb' => 'GET'],
        ['name' => 'time_entry#create', 'url' => '/api/time-entries', 'verb' => 'POST'],
        ['name' => 'time_entry#update', 'url' => '/api/time-entries/{id}', 'verb' => 'PUT'],
        ['name' => 'time_entry#destroy', 'url' => '/api/time-entries/{id}', 'verb' => 'DELETE'],
        ['name' => 'time_entry#submit', 'url' => '/api/time-entries/{id}/submit', 'verb' => 'POST'],
        ['name' => 'time_entry#approve', 'url' => '/api/time-entries/{id}/approve', 'verb' => 'POST'],
        ['name' => 'time_entry#reject', 'url' => '/api/time-entries/{id}/reject', 'verb' => 'POST'],
        ['name' => 'time_entry#suggestBreak', 'url' => '/api/time-entries/suggest-break', 'verb' => 'POST'],
        ['name' => 'time_entry#monthlyStats', 'url' => '/api/time-entries/stats/monthly', 'verb' => 'GET'],

        // Absences API
        ['name' => 'absence#index', 'url' => '/api/absences', 'verb' => 'GET'],
        ['name' => 'absence#show', 'url' => '/api/absences/{id}', 'verb' => 'GET'],
        ['name' => 'absence#create', 'url' => '/api/absences', 'verb' => 'POST'],
        ['name' => 'absence#update', 'url' => '/api/absences/{id}', 'verb' => 'PUT'],
        ['name' => 'absence#destroy', 'url' => '/api/absences/{id}', 'verb' => 'DELETE'],
        ['name' => 'absence#approve', 'url' => '/api/absences/{id}/approve', 'verb' => 'POST'],
        ['name' => 'absence#reject', 'url' => '/api/absences/{id}/reject', 'verb' => 'POST'],
        ['name' => 'absence#cancel', 'url' => '/api/absences/{id}/cancel', 'verb' => 'POST'],
        ['name' => 'absence#vacationStats', 'url' => '/api/absences/vacation-stats', 'verb' => 'GET'],
        ['name' => 'absence#types', 'url' => '/api/absences/types', 'verb' => 'GET'],
        ['name' => 'absence#pending', 'url' => '/api/absences/pending', 'verb' => 'GET'],

        // Employees API
        ['name' => 'employee#index', 'url' => '/api/employees', 'verb' => 'GET'],
        ['name' => 'employee#show', 'url' => '/api/employees/{id}', 'verb' => 'GET'],
        ['name' => 'employee#me', 'url' => '/api/employees/me', 'verb' => 'GET'],
        ['name' => 'employee#create', 'url' => '/api/employees', 'verb' => 'POST'],
        ['name' => 'employee#update', 'url' => '/api/employees/{id}', 'verb' => 'PUT'],
        ['name' => 'employee#destroy', 'url' => '/api/employees/{id}', 'verb' => 'DELETE'],
        ['name' => 'employee#team', 'url' => '/api/employees/team', 'verb' => 'GET'],
        ['name' => 'employee#federalStates', 'url' => '/api/employees/federal-states', 'verb' => 'GET'],

        // Holidays API
        ['name' => 'holiday#index', 'url' => '/api/holidays', 'verb' => 'GET'],
        ['name' => 'holiday#show', 'url' => '/api/holidays/{id}', 'verb' => 'GET'],
        ['name' => 'holiday#generate', 'url' => '/api/holidays/generate', 'verb' => 'POST'],
        ['name' => 'holiday#generateAll', 'url' => '/api/holidays/generate-all', 'verb' => 'POST'],
        ['name' => 'holiday#check', 'url' => '/api/holidays/check', 'verb' => 'GET'],
        ['name' => 'holiday#federalStates', 'url' => '/api/holidays/federal-states', 'verb' => 'GET'],
        ['name' => 'holiday#easter', 'url' => '/api/holidays/easter', 'verb' => 'GET'],

        // Projects API
        ['name' => 'project#index', 'url' => '/api/projects', 'verb' => 'GET'],
        ['name' => 'project#indexAll', 'url' => '/api/projects/all', 'verb' => 'GET'],
        ['name' => 'project#show', 'url' => '/api/projects/{id}', 'verb' => 'GET'],
        ['name' => 'project#create', 'url' => '/api/projects', 'verb' => 'POST'],
        ['name' => 'project#update', 'url' => '/api/projects/{id}', 'verb' => 'PUT'],
        ['name' => 'project#destroy', 'url' => '/api/projects/{id}', 'verb' => 'DELETE'],

        // Settings API
        ['name' => 'settings#index', 'url' => '/api/settings', 'verb' => 'GET'],
        ['name' => 'settings#show', 'url' => '/api/settings/{key}', 'verb' => 'GET'],
        ['name' => 'settings#update', 'url' => '/api/settings/{key}', 'verb' => 'PUT'],
        ['name' => 'settings#updateMultiple', 'url' => '/api/settings', 'verb' => 'PUT'],
        ['name' => 'settings#reset', 'url' => '/api/settings/{key}/reset', 'verb' => 'POST'],
        ['name' => 'settings#resetAll', 'url' => '/api/settings/reset-all', 'verb' => 'POST'],
        ['name' => 'settings#permissions', 'url' => '/api/settings/permissions', 'verb' => 'GET'],
        ['name' => 'settings#hrManagers', 'url' => '/api/settings/hr-managers', 'verb' => 'GET'],
        ['name' => 'settings#setHrManagers', 'url' => '/api/settings/hr-managers', 'verb' => 'PUT'],

        // Reports API
        ['name' => 'report#monthly', 'url' => '/api/reports/monthly', 'verb' => 'GET'],
        ['name' => 'report#pdf', 'url' => '/api/reports/pdf', 'verb' => 'GET'],
        ['name' => 'report#team', 'url' => '/api/reports/team', 'verb' => 'GET'],
        ['name' => 'report#overtime', 'url' => '/api/reports/overtime', 'verb' => 'GET'],
    ]
];
