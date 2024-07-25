<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Net extends Model
{
    use HasFactory;

    protected $fillable = [
        'fiche_de_paie_id', 'acomptePerçu', 'pretSociete'
    ];

    public function ficheDePaie()
    {
        return $this->belongsTo(FicheDePaie::class, 'fiche_de_paie_id');
    }
}
