<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_fiche_de_paies_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFicheDePaiesTable extends Migration
{
    public function up()
    {
        Schema::create('fiche_de_paies', function (Blueprint $table) {
            $table->id();
            $table->string('mois');
            $table->integer('annee');
            $table->double('salaireBrut');
            $table->double('cotisations');
            $table->double('netAPayer');
            $table->foreignId('employe_id')->constrained('employes')->onDelete('cascade');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('fiche_de_paies');
    }
}