<?php


namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SalaireBrut extends Model
{
    use HasFactory;

    protected $fillable = [
        'fiche_de_paie_id', 'salaireHoraireBase', 'salaireMensuelBase', 'indemniteTransport', 'indemniteTransport93', 'indemniteLogement', 'primePresenceHoraire', 'primePresenceMensuelle', 'primeTransportHoraire', 'primeTransportMensuelle', 'primeLogement', 'primeExceptionnelle', 'primePenibilite', 'primeNuit', 'primePanier', 'primeProductivite', 'heuresNuit'
    ];

    public function ficheDePaie()
    {
        return $this->belongsTo(FicheDePaie::class, 'fiche_de_paie_id');
    }
}
