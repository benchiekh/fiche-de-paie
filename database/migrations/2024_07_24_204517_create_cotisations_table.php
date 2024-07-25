<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_cotisations_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCotisationsTable extends Migration
{
    public function up()
    {
        Schema::create('cotisations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fiche_de_paie_id')->constrained('fiche_de_paies')->onDelete('cascade');
            $table->double('cotisationCNSS');
            $table->double('cotisationIRPP');
            $table->double('assuranceGroupe');
            $table->double('cotisationCAVIS');
            $table->double('regularisationFinExercice');
            $table->double('accidentTravail');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('cotisations');
    }
}
