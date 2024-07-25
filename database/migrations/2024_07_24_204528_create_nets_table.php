<?php
// database/migrations/xxxx_xx_xx_xxxxxx_create_nets_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNetsTable extends Migration
{
    public function up()
    {
        Schema::create('nets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fiche_de_paie_id')->constrained('fiche_de_paies')->onDelete('cascade');
            $table->double('acomptePerçu');
            $table->double('pretSociete');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('nets');
    }
}
