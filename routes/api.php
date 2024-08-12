<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeController;
use App\Http\Controllers\FicheDePaieController;
use App\Http\Controllers\SalaireBrutController;
use App\Http\Controllers\CotisationController;
use App\Http\Controllers\NetController;

// Route pour obtenir l'utilisateur authentifié
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Routes API pour les ressources
Route::apiResource('employes', EmployeController::class);
Route::apiResource('fiche_de_paies', FicheDePaieController::class);
Route::apiResource('salaire_bruts', SalaireBrutController::class);
Route::apiResource('cotisations', CotisationController::class);
Route::apiResource('nets', NetController::class);